import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import Reveal from "./Reveal";

/* Component styles (rendered once via a hoisted <style>) */
const css = `/* Image stage used by Hero, Company, Workspace and FinalCta.
   Parents customise it through CSS variables set on className:
   --scene-h (required), --scene-radius, --scene-bg, --scene-shade */

.scene-frame {
  position: relative;
  height: var(--scene-h);
  border-radius: var(--scene-radius, var(--r-lg));
}

/* soft pink / violet / blue halo */
.scene-glow::before {
  content: "";
  position: absolute;
  inset: -34px;
  z-index: -1;
  border-radius: 60px;
  background:
    radial-gradient(60% 70% at 0 40%, var(--pink), transparent 70%),
    radial-gradient(60% 70% at 100% 50%, var(--blue), transparent 70%),
    radial-gradient(50% 50% at 0 100%, var(--violet), transparent 70%);
  filter: blur(26px);
  opacity: 0.75;
  animation: scene-breathe 7s ease-in-out infinite;
}

@keyframes scene-breathe {
  0%, 100% { opacity: 0.75; }
  50% { opacity: 0.55; }
}

.scene {
  position: relative;
  height: 100%;
  overflow: hidden;
  isolation: isolate;
  border-radius: inherit;
  background: var(--scene-bg, #d9d2ee);
}

/* readability overlay between photo and text */
.scene-shade {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: var(--scene-shade, none);
  pointer-events: none;
}`;


type SceneProps = {
  children: ReactNode;
  /** Sets the --scene-* variables (height is required). */
  className: string;
  glow?: boolean;
  delay?: number;
};

/** Rounded image stage that reveals on scroll. Children are positioned absolutely by the parent. */
export default function Scene({ children, className, glow = false, delay = 0 }: SceneProps) {
  return (
    <>
      <style href="ov-scene" precedence="default">{css}</style>
      <Reveal scale delay={delay} className={cx("scene-frame", glow && "scene-glow", className)}>
        <div className="scene">
          <div className="scene-shade" />
          {children}
        </div>
      </Reveal>
    </>
  );
}
