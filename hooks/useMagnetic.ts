"use client";
import { useEffect, type RefObject } from "react";

/** Pulls the element slightly toward the pointer while hovering. */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  strength = 0.28,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength * 1.4;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref, strength, enabled]);
}
