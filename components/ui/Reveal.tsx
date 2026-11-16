"use client";
import { Fragment, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { useInView } from "@/hooks/useInView";

/* Component styles (rendered once via a hoisted <style>) */
const css = `/* ---- scroll reveal ---- */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  transition-delay: calc(var(--d, 0) * 90ms);
}

.reveal.reveal-scale {
  transform: translateY(40px) scale(0.97);
}

.reveal.reveal-in {
  opacity: 1;
  transform: none;
}

/* ---- staggered word reveal ---- */
.reveal-word {
  display: inline-block;
  overflow: hidden;
  margin-bottom: -0.14em;
  padding-bottom: 0.14em;
  vertical-align: top;
}

.reveal-word > span {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 0.9s var(--ease);
  transition-delay: calc(var(--i) * 70ms);
}

.reveal-split.reveal-in .reveal-word > span {
  transform: none;
}

.reveal-dim {
  color: var(--dim);
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal-word > span {
    opacity: 1 !important;
    transform: none !important;
  }
}`;


type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in 90ms steps. */
  delay?: number;
  /** Larger entrance with a slight scale-up (used for image frames). */
  scale?: boolean;
  as?: ElementType;
};

/** Fades and slides its children in when they scroll into view. */
export default function Reveal({ children, className, delay = 0, scale = false, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref);
  return (
    <>
      <style href="ov-reveal" precedence="default">{css}</style>
      <Tag
        ref={ref}
        className={cx("reveal", scale && "reveal-scale", seen && "reveal-in", className)}
        style={{ "--d": delay } as CSSProperties}
      >
        {children}
      </Tag>
    </>
  );
}

type SplitTextProps = { text: string; as?: "h1" | "h2" | "blockquote"; className?: string };

/**
 * Staggered word-by-word reveal.
 * In `text`, "\n" is a line break and *asterisks* wrap words that should be dimmed.
 */
export function SplitText({ text, as = "h2", className }: SplitTextProps) {
  const Tag: ElementType = as;
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { threshold: 0.2 });
  let wordIndex = 0;

  const renderWords = (segment: string) =>
    segment
      .split(/(\s+)/)
      .filter(Boolean)
      .map((token, i) =>
        /^\s+$/.test(token) ? (
          " "
        ) : (
          <span className="reveal-word" key={i}>
            <span style={{ "--i": wordIndex++ } as CSSProperties}>{token}</span>
          </span>
        )
      );

  return (
    <>
      <style href="ov-reveal" precedence="default">{css}</style>
      <Tag
        ref={(element: HTMLElement | null) => {
          ref.current = element;
        }}
        className={cx("reveal-split", seen && "reveal-in", className)}
      >
        {text.split("\n").map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split("*").map((segment, i) =>
              i % 2 ? (
                <span className="reveal-dim" key={i}>{renderWords(segment)}</span>
              ) : (
                <Fragment key={i}>{renderWords(segment)}</Fragment>
              )
            )}
          </Fragment>
        ))}
      </Tag>
    </>
  );
}
