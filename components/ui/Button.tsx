"use client";
import { useRef, type MouseEvent, type ReactNode, type Ref } from "react";
import { cx } from "@/lib/cx";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useSignup } from "./SignupDialog";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 12px 22px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: var(--fs-sm);
  font-weight: 500;
  cursor: pointer;
  will-change: transform;
  transition: box-shadow 0.4s var(--ease), transform 0.3s var(--ease);
}

/* shine sweep */
.button::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.28) 50%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.7s var(--ease);
}

.button:hover {
  box-shadow: 0 10px 30px -6px rgba(140, 100, 240, 0.55), 0 0 0 4px rgba(201, 168, 245, 0.25);
}

.button:hover::after {
  transform: translateX(120%);
}

.button-sm {
  min-height: 40px;
  padding: 10px 18px;
}

.button-light {
  background: #fff;
  color: var(--ink);
}

.button-block {
  width: 100%;
  padding: 14px;
}`;

type ButtonProps = {
  children: ReactNode;
  /** Renders a link when set (or when `signup` is true); otherwise a <button>. */
  href?: string;
  size?: "sm";
  variant?: "light";
  block?: boolean;
  magnetic?: boolean;
  /** Opens the sign-up dialog instead of following the link. */
  signup?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button({ children, href, size, variant, block, magnetic = true, signup, type = "button", onClick }: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const { open } = useSignup();
  useMagnetic(ref, 0.28, magnetic);

  const className = cx("button", size && `button-${size}`, variant && `button-${variant}`, block && "button-block");

  const isLink = Boolean(href || signup);
  const handleClick = signup
    ? (e: MouseEvent) => {
        e.preventDefault();
        open();
      }
    : undefined;

  return (
    <>
      <style href="ov-button" precedence="default">{css}</style>
      {isLink ? (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href ?? "#cta"} className={className} onClick={handleClick}>
          {children}
        </a>
      ) : (
        <button ref={ref as Ref<HTMLButtonElement>} type={type} className={className} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
}
