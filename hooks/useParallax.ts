"use client";
import { useEffect, type RefObject } from "react";

/** Moves the element against the scroll, relative to its parent scene. */
export function useParallax<T extends HTMLElement>(ref: RefObject<T | null>, speed = 0.07) {
  useEffect(() => {
    const el = ref.current;
    const scene = el?.parentElement;
    if (!el || !scene || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let queued = false;
    const update = () => {
      queued = false;
      const r = scene.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      const offset = r.top + r.height / 2 - innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [ref, speed]);
}
