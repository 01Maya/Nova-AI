import Button from "@/components/ui/Button";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { SplitText } from "@/components/ui/Reveal";
import Scene from "@/components/ui/Scene";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.final {
  margin-top: var(--sec);
}

.final-frame {
  --scene-h: clamp(300px, 36vw, 380px);
  --scene-bg: linear-gradient(#5a4f8f, #b98fa8 45%, #e7b78e 62%, #6a5c8a 63%);
  --scene-shade: linear-gradient(rgba(40, 20, 70, 0.2), rgba(40, 20, 70, 0.5));
}

.final-copy {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 2vw, 16px);
  padding: 24px clamp(18px, 5vw, 56px);
  color: #fff;
  text-align: center;
}

.final-title {
  max-width: 520px;
  font-size: var(--fs-h2);
}

.final-text {
  max-width: 560px;
  margin-bottom: 6px;
  opacity: 0.9;
}`;

const content = {
  title: "Make room for what matters.",
  text: "Let NOVA take care of the busywork while you focus on your next big idea.",
  cta: "Try NOVA for Free",
  image: { src: "/images/cta.jpg", alt: "Sunset over lavender hills" },
};

export default function FinalCta() {
  return (
    <>
      <style href="ov-final" precedence="default">{css}</style>
      <section className="wrap final" id="cta">
        <Scene glow className="final-frame">
          <ParallaxImage
            src={content.image.src}
            alt={content.image.alt}
            speed={0.06}
            sizes="(max-width: 1040px) 100vw, 1040px"
          />
          <div className="final-copy">
            <SplitText className="final-title" text={content.title} />
            <p className="final-text">{content.text}</p>
            <Button variant="light" signup>{content.cta}</Button>
          </div>
        </Scene>
      </section>
    </>
  );
}
