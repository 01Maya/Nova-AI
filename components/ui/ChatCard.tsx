"use client";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Component styles (rendered once via a hoisted <style>) */
const css = `/* Floating AI prompt card that sits inside the hero scene. */

.chat {
  position: absolute;
  top: 20%;
  left: 50%;
  z-index: 4;
  width: min(480px, 86%);
  transform: translateX(-50%);
  perspective: 900px;
}

.chat-card {
  padding: 18px 18px 14px;
  border-radius: var(--r-md);
  background: #fff;
  text-align: left;
  box-shadow: 0 24px 60px -18px rgba(40, 30, 90, 0.35);
  transform-style: preserve-3d;
  transition: transform 0.25s ease-out, box-shadow 0.4s;
  animation: chat-float 8s ease-in-out infinite;
}

.chat-card:hover {
  box-shadow: 0 30px 70px -14px rgba(130, 90, 240, 0.45);
  animation-play-state: paused;
}

/* uses the independent translate property so it never fights the pointer tilt */
@keyframes chat-float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -6px; }
}

.chat-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-spark {
  flex: none;
  width: 15px;
  height: 15px;
  background: linear-gradient(135deg, var(--accent), #e86fb5);
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
}

.chat-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  text-overflow: ellipsis;
}

.chat-input::placeholder {
  color: var(--ink);
  opacity: 1;
}

.chat-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 22px;
  color: var(--mute);
  font-size: var(--fs-xs);
}

.chat-attach {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: none;
  color: var(--mute);
  font-size: var(--fs-xs);
  cursor: pointer;
}

.chat-plus {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background: #f1f1f3;
  transition: transform 0.3s var(--ease);
}

.chat-plus::before,
.chat-plus::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 1px;
  background: var(--ink);
  transform: translate(-50%, -50%);
}

.chat-plus::before { width: 8px; height: 1.5px; }
.chat-plus::after { width: 1.5px; height: 8px; }

.chat-attach:hover .chat-plus {
  transform: rotate(90deg);
}

.chat-send {
  position: relative;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: var(--ink);
  cursor: pointer;
  transition: transform 0.3s var(--ease), box-shadow 0.3s;
}

.chat-send:hover {
  transform: scale(1.12);
  box-shadow: 0 0 0 5px rgba(122, 90, 248, 0.2);
}

/* up arrow: stem + chevron */
.chat-send::before,
.chat-send::after {
  content: "";
  position: absolute;
  left: 50%;
}

.chat-send::before {
  top: 11px;
  width: 1.5px;
  height: 14px;
  background: #fff;
  transform: translateX(-50%);
}

.chat-send::after {
  top: 11.5px;
  width: 7px;
  height: 7px;
  border-top: 1.5px solid #fff;
  border-left: 1.5px solid #fff;
  transform: translateX(-50%) rotate(45deg);
}

.chat-reply {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  color: #333;
  line-height: 1.55;
  transition: max-height 0.6s var(--ease), opacity 0.4s, margin 0.4s;
}

.chat-replyOpen {
  max-height: 240px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
  opacity: 1;
}

.chat-caret {
  display: inline-block;
  width: 1px;
  height: 14px;
  margin-left: 1px;
  background: var(--ink);
  vertical-align: -2px;
  animation: chat-blink 1s steps(1) infinite;
}

@keyframes chat-blink {
  50% { opacity: 0; }
}

@media (max-width: 640px) {
  .chat {
    top: 12%;
    width: 92%;
  }
}`;

const content = {
  label: "Prompt",
  attach: "Add Attachments",
  attached: "brief.pdf attached",
  send: "Send prompt",
  replies: {
    workout:
      "Here’s a 3-day beginner plan: Day 1 – full-body strength (squats, push-ups, rows). Day 2 – 25 min brisk walk or bike. Day 3 – mobility and core. Add a rest day between each.",
    fallback:
      "Done. I broke your request into clear steps, drafted the first version, and queued follow-ups in your workspace. Want me to refine it?",
  },
};

type ChatCardProps = {
  /** Suggested prompt; also what gets sent when the input is empty. */
  placeholder: string;
  /** Fires when the first reply starts streaming. */
  onReplyStart?: () => void;
};

/** Floating AI prompt card: typed placeholder, streamed reply and pointer tilt. */
export default function ChatCard({ placeholder, onReplyStart }: ChatCardProps) {
  const reduced = useReducedMotion();
  const card = useRef<HTMLDivElement>(null);
  const stream = useRef<number>(0);
  const firstRun = useRef(true);

  const [value, setValue] = useState("");
  const [hint, setHint] = useState(placeholder);
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [busy, setBusy] = useState(false);
  const [attached, setAttached] = useState(false);

  // Type out the new placeholder whenever the active tab changes.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (reduced) {
      setHint(placeholder);
      return;
    }
    let length = 0;
    setHint("");
    const id = window.setInterval(() => {
      length += 1;
      setHint(placeholder.slice(0, length));
      if (length >= placeholder.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [placeholder, reduced]);

  useEffect(() => () => clearInterval(stream.current), []);

  const send = () => {
    const question = (value || placeholder).trim();
    if (busy || !question) return;

    const answer = /workout|fitness|exercise/i.test(question) ? content.replies.workout : content.replies.fallback;
    setShowReply(true);
    setValue("");
    onReplyStart?.();

    if (reduced) {
      setReply(answer);
      return;
    }
    setBusy(true);
    let length = 0;
    stream.current = window.setInterval(() => {
      length += 2;
      setReply(answer.slice(0, length));
      if (length >= answer.length) {
        clearInterval(stream.current);
        setBusy(false);
      }
    }, 16);
  };

  const attach = () => {
    setAttached(true);
    setTimeout(() => setAttached(false), 2200);
  };

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !card.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  };

  const resetTilt = () => {
    if (card.current) card.current.style.transform = "";
  };

  return (
    <>
      <style href="ov-chat" precedence="default">{css}</style>
      <div className="chat" onPointerMove={tilt} onPointerLeave={resetTilt}>
        <div className="chat-card" ref={card}>
          <label className="chat-row">
            <span className="chat-spark" aria-hidden="true" />
            <span className="sr">{content.label}</span>
            <input
              className="chat-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={hint}
              autoComplete="off"
            />
          </label>

          <div className="chat-bar">
            <button className="chat-attach" type="button" onClick={attach}>
              <span className="chat-plus" aria-hidden="true" />
              {attached ? content.attached : content.attach}
            </button>
            <button className="chat-send" type="button" aria-label={content.send} onClick={send} />
          </div>

          <div className={cx("chat-reply", showReply && "chat-replyOpen")} aria-live="polite">
            {reply}
            {busy && <span className="chat-caret" />}
          </div>
        </div>
      </div>
    </>
  );
}
