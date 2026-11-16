"use client";
import { useEffect, useState, type RefObject } from "react";

type Options = { once?: boolean; threshold?: number; rootMargin?: string };

/** True once the referenced element scrolls into view. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, threshold = 0.15, rootMargin = "0px 0px -6% 0px" }: Options = {}
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, threshold, rootMargin]);
  return inView;
}
