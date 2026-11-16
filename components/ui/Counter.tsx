"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CounterProps = { value: number; decimals?: number; duration?: number };

/** Counts up from 0 to `value` when scrolled into view. */
export default function Counter({ value, decimals = 0, duration = 1600 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { threshold: 0.6, rootMargin: "0px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduced) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const v = value * (1 - Math.pow(1 - p, 4));
      setN(decimals ? v : Math.round(v));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, decimals, duration]);

  return (
    <span ref={ref}>
      {n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}
