"use client";
import Image from "next/image";
import { useRef } from "react";
import { cx } from "@/lib/cx";
import { useInView } from "@/hooks/useInView";
import { useParallax } from "@/hooks/useParallax";

/* Component styles (rendered once via a hoisted <style>) */
const css = `/* Oversized so it can drift without exposing edges. */
.parallax-layer {
  position: absolute;
  inset: -12% 0;
  scale: 1.1;
  will-change: transform;
  transition: scale 1.8s var(--ease);
}

.parallax-seen {
  scale: 1;
}`;


type ParallaxImageProps = { src: string; alt: string; speed?: number; sizes?: string; priority?: boolean };

/** Photo that settles in and drifts slowly while scrolling. Place inside <Scene>. */
export default function ParallaxImage({ src, alt, speed = 0.07, sizes = "100vw", priority = false }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { threshold: 0.05 });
  useParallax(ref, speed);
  return (
    <>
      <style href="ov-parallax" precedence="default">{css}</style>
      <div ref={ref} className={cx("parallax-layer", seen && "parallax-seen")}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      </div>
    </>
  );
}
