"use client";
import { useState } from "react";
import { cx } from "@/lib/cx";
import Button from "@/components/ui/Button";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal, { SplitText } from "@/components/ui/Reveal";
import Scene from "@/components/ui/Scene";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.workspace-build {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 5vw, 56px);
  align-items: center;
  padding-top: var(--sec);
}

.workspace-title {
  font-size: var(--fs-h2);
}

.workspace-text {
  max-width: 320px;
  margin: clamp(12px, 2vw, 18px) 0 clamp(20px, 3vw, 30px);
  color: var(--mute);
  font-size: var(--fs-md);
  line-height: 1.5;
}

/* tip card: click to cycle */
.workspace-tip {
  display: block;
  width: min(300px, 100%);
  padding: clamp(12px, 2vw, 16px);
  border: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 0 1px var(--line), 0 8px 24px -14px rgba(0, 0, 0, 0.14);
  text-align: left;
  cursor: pointer;
  transition: translate 0.4s var(--ease), box-shadow 0.4s;
}

.workspace-tip:hover {
  translate: 6px 0;
  box-shadow: 0 0 0 1px var(--violet), 0 12px 30px -12px rgba(140, 100, 240, 0.5);
}

.workspace-tip small {
  display: block;
  margin-top: 2px;
  color: var(--mute);
  font-size: var(--fs-xs);
}

.workspace-note {
  margin: clamp(14px, 2vw, 20px) 0 14px;
  color: var(--mute);
  font-size: var(--fs-xs);
}

/* ---- setup card ---- */
.workspace-frame {
  --scene-h: min(360px, 92vw);
  --scene-bg: linear-gradient(#8f8fd0, #c9b8e6 40%, #e9d6ea);
  --scene-shade: linear-gradient(transparent 50%, rgba(40, 20, 70, 0.18));
}

.workspace-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  width: 86%;
  z-index: 4;
  padding: clamp(12px, 2vw, 18px);
  border-radius: var(--r-sm);
  background: #fff;
  box-shadow: 0 14px 40px -14px rgba(0, 0, 0, 0.35);
  transform: translate(-50%, -50%);
}

.workspace-panelHead {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 500;
}

.workspace-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: var(--mute);
  font-size: var(--fs-xs);
}

.workspace-track {
  flex: 1;
  height: 3px;
  overflow: hidden;
  border-radius: 2px;
  background: #eee;
}

.workspace-fill {
  display: block;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--violet), var(--accent));
  transition: width 0.8s var(--ease);
}

.workspace-step {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 40px;
  padding: 6px 2px;
  border: 0;
  background: none;
  color: var(--mute);
  text-align: left;
  cursor: pointer;
  transition: color 0.3s, translate 0.3s var(--ease);
}

.workspace-step:hover {
  translate: 3px 0;
  color: var(--ink);
}

.workspace-dot {
  display: grid;
  flex: none;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid #cfcfd4;
  border-radius: 50%;
  transition: background 0.35s, border-color 0.35s, transform 0.4s var(--ease);
}

/* check mark drawn with borders, scales in when done */
.workspace-dot::after {
  content: "";
  width: 4px;
  height: 8px;
  margin-top: -2px;
  border: solid #fff;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 0.35s var(--ease);
}

.workspace-done {
  color: var(--ink);
}

.workspace-done .workspace-dot {
  border-color: var(--ink);
  background: var(--ink);
  transform: scale(1.1);
}

.workspace-done .workspace-dot::after {
  transform: rotate(45deg) scale(1);
}

@media (max-width: 900px) {
  .workspace-build {
    grid-template-columns: 1fr;
    gap: clamp(24px, 5vw, 40px);
    padding-top: var(--sec);
  }
}

@media (max-width: 640px) {
  .workspace-frame { --scene-h: clamp(320px, 85vw, 400px); }
}`;

const content = {
  title: "Your entire workflow. One intelligent workspace.",
  text: "Plan projects, automate repetitive tasks, and manage everything from one place.",
  tipTitle: "Everything works better together",
  tips: [
    "Smart Task Management",
    "Automated Workflows",
    "AI-Powered Assistance",
  ],
  note: "Three powerful ways to make room for great work.",
  cta: "Explore NOVA",
  panelTitle: "Your intelligent workspace",
  steps: ["Smart Task Management", "Automated Workflows", "AI-Powered Assistance"],
  image: { src: "/images/workspace.jpg", alt: "Green meadow with purple flowers at dusk" },
};

export default function Workspace() {
  const [tipIndex, setTipIndex] = useState(0);
  const [done, setDone] = useState(content.steps.map((_, i) => i === 0));
  const percent = Math.round((done.filter(Boolean).length / done.length) * 100);

  // Completing a step completes everything before it; clicking a finished step rewinds to just before it.
  const toggleStep = (index: number) => {
    const completing = !done[index];
    setDone(done.map((_, i) => (completing ? i <= index : i < index)));
  };

  return (
    <>
      <style href="ov-workspace" precedence="default">{css}</style>
      <section className={cx("wrap", "workspace-build")} id="features">
        <div>
          <SplitText className="workspace-title" text={content.title} />
          <Reveal as="p" className="workspace-text">{content.text}</Reveal>

          <Reveal>
            <button className="workspace-tip" onClick={() => setTipIndex((tipIndex + 1) % content.tips.length)}>
              {content.tipTitle}
              <small>{content.tips[tipIndex]}</small>
            </button>
          </Reveal>

          <Reveal as="p" className="workspace-note">{content.note}</Reveal>
          <Reveal>
            <Button signup>{content.cta}</Button>
          </Reveal>
        </div>

        <Scene glow className="workspace-frame">
          <ParallaxImage
            src={content.image.src}
            alt={content.image.alt}
            speed={0.06}
            sizes="(max-width: 900px) 100vw, 520px"
          />
          <div className="workspace-panel">
            <div className="workspace-panelHead">
              <span>{content.panelTitle}</span>
              <span aria-hidden="true">×</span>
            </div>

            <div className="workspace-progress">
              <div className="workspace-track">
                <i className="workspace-fill" style={{ width: `${percent}%` }} />
              </div>
              <span>{percent}%</span>
            </div>

            {content.steps.map((label, i) => (
              <button
                key={label}
                className={cx("workspace-step", done[i] && "workspace-done")}
                aria-pressed={done[i]}
                onClick={() => toggleStep(i)}
              >
                <span className="workspace-dot" />
                {label}
              </button>
            ))}
          </div>
        </Scene>
      </section>
    </>
  );
}
