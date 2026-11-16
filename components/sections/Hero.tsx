"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import Button from "@/components/ui/Button";
import ChatCard from "@/components/ui/ChatCard";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal, { SplitText } from "@/components/ui/Reveal";
import Scene from "@/components/ui/Scene";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.hero {
  padding-top: clamp(104px, 12vw, 140px);
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px clamp(10px, 2vw, 14px);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.06);
  font-size: var(--fs-xs);
}

.hero-badgeIcon {
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ink);
}

.hero-star {
  width: 9px;
  height: 9px;
  background: #fff;
  clip-path: polygon(50% 0, 62% 36%, 98% 36%, 69% 58%, 80% 94%, 50% 72%, 20% 94%, 31% 58%, 2% 36%, 38% 36%);
}

.hero-title {
  max-width: 920px;
  margin: clamp(16px, 2.4vw, 24px) auto clamp(12px, 2vw, 20px);
  font-size: var(--fs-h1);
  letter-spacing: -0.04em;
  line-height: 1.04;
}

.hero-lead {
  max-width: 560px;
  margin: 0 auto clamp(18px, 2.5vw, 26px);
  color: var(--mute);
  font-size: var(--fs-md);
  line-height: 1.55;
}

/* ---- tabs with sliding pill ---- */
.hero-tabs {
  position: relative;
  display: inline-flex;
  gap: 4px;
  max-width: 100%;
  margin-top: clamp(20px, 3vw, 30px);
  padding: 4px;
  overflow-x: auto;
  border-radius: 999px;
  background: #f3f3f5;
  scrollbar-width: none;
}

.hero-tabs::-webkit-scrollbar {
  display: none;
}

.hero-pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.5s var(--ease), width 0.5s var(--ease);
}

.hero-tab {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 16px;
  border: 0;
  border-radius: 999px;
  background: none;
  color: #555;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.3s;
}

.hero-tab[aria-selected="true"] {
  color: var(--ink);
}

/* tab icons are pure CSS shapes */
.hero-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: currentColor;
  opacity: 0.75;
}

.hero-tab[aria-selected="true"] .hero-icon {
  background: linear-gradient(135deg, var(--accent), #e86fb5);
  opacity: 1;
}

.hero-t1 { clip-path: polygon(0 100%, 0 55%, 25% 55%, 25% 100%, 38% 100%, 38% 0, 62% 0, 62% 100%, 75% 100%, 75% 30%, 100% 30%, 100% 100%); }
.hero-t2 { clip-path: polygon(0 100%, 0 72%, 68% 0, 100% 32%, 28% 100%); }
.hero-t3 { clip-path: polygon(35% 0, 65% 0, 65% 38%, 100% 100%, 0 100%, 35% 38%); }
.hero-t4 { clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%); }

/* ---- image stage ---- */
.hero-frame {
  --scene-h: clamp(320px, 42vw, 460px);
  --scene-bg: linear-gradient(#aecbe8 0%, #dfe4ee 45%, #f0dfe6 70%);
  --scene-shade: linear-gradient(transparent 55%, rgba(25, 15, 50, 0.5));
  width: var(--wrap);
  margin: clamp(24px, 3.5vw, 36px) auto 0;
}

.hero-beta {
  position: absolute;
  inset: auto 0 18px;
  z-index: 4;
  padding: 0 16px;
  color: #fff;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.55);
  transition: opacity 0.3s;
}

.hero-beta a {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* hide the hint while a reply is on screen */
.hero-betaHidden {
  opacity: 0;
}

@media (max-width: 640px) {
  .hero-frame { --scene-h: clamp(330px, 90vw, 420px); }
}

@media (max-width: 420px) {
  .hero-tabs { gap: 0; }
  .hero-tab { gap: 5px; padding: 10px 8px; font-size: var(--fs-xs); }
}`;

const content = {
  badge: "Loved by 20,000+ Professionals",
  title: "Work smarter. Create faster.\nLet AI handle the rest.",
  text: "Your intelligent workspace to automate tasks, organize ideas, and turn everyday work into effortless progress.",
  cta: "Get Started Free",
  tabsLabel: "Workflow stages",
  tabs: [
    { label: "Create", icon: "t1", prompt: "What would you like to accomplish today?" },
    { label: "Automate", icon: "t2", prompt: "What would you like to automate today?" },
    { label: "Organize", icon: "t3", prompt: "What would you like to organize today?" },
    { label: "Analyze", icon: "t4", prompt: "What would you like to analyze today?" },
  ],
  image: { src: "/images/hero.jpg", alt: "Lavender hills beneath a soft blue sky" },
  beta: { before: "Make your next idea happen with ", link: "NOVA AI", after: "." },
};

export default function Hero() {
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState({ width: 0, x: 0 });
  const [replyOpen, setReplyOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep the sliding pill under the active tab (also on resize and once fonts load).
  useEffect(() => {
    const update = () => {
      const tab = tabRefs.current[active];
      if (tab) setPill({ width: tab.offsetWidth, x: tab.offsetLeft });
    };
    update();
    addEventListener("resize", update);
    document.fonts?.ready.then(update);
    return () => removeEventListener("resize", update);
  }, [active]);

  // Arrow keys move between tabs (roving tabindex).
  const onTabKeyDown = (e: KeyboardEvent, index: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = (index + step + content.tabs.length) % content.tabs.length;
    tabRefs.current[next]?.focus();
    setActive(next);
  };

  return (
    <>
      <style href="ov-hero" precedence="default">{css}</style>
      <section className="hero" id="product">
        <div className="wrap">
          <Reveal className="hero-badge">
            <b className="hero-badgeIcon"><i className="hero-star" /></b>
            {content.badge}
          </Reveal>

          <SplitText as="h1" className="hero-title" text={content.title} />
          <Reveal as="p" className="hero-lead" delay={6}>{content.text}</Reveal>

          <Reveal delay={7}>
            <Button signup>{content.cta}</Button>
          </Reveal>

          <Reveal className="hero-tabs" delay={8}>
            <div role="tablist" aria-label={content.tabsLabel} style={{ display: "contents" }}>
              <span className="hero-pill" style={{ width: pill.width, transform: `translateX(${pill.x}px)` }} />
              {content.tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  className="hero-tab"
                  role="tab"
                  aria-selected={active === i}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                >
                  <i className={cx("hero-icon", `hero-${tab.icon}`)} />
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Scene glow delay={9} className="hero-frame">
          <ParallaxImage
            src={content.image.src}
            alt={content.image.alt}
            sizes="(max-width: 1040px) 100vw, 1040px"
            priority
          />
          <ChatCard placeholder={content.tabs[active].prompt} onReplyStart={() => setReplyOpen(true)} />
          <p className={cx("hero-beta", replyOpen && "hero-betaHidden")}>
            {content.beta.before}
            <a href="#cta">{content.beta.link}</a>
            {content.beta.after}
          </p>
        </Scene>
      </section>
    </>
  );
}
