import Image from "next/image";
import Button from "@/components/ui/Button";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { SplitText } from "@/components/ui/Reveal";
import Scene from "@/components/ui/Scene";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.company {
  margin-top: var(--sec);
}

/* full-bleed band: no radius, purple wash on the left for legible white text */
.company-frame {
  --scene-h: clamp(460px, 52vw, 580px);
  --scene-radius: 0;
  --scene-bg: linear-gradient(#b86fc0, #d49ccd 30%, #c5b6e0 60%, #d6d3ee);
  --scene-shade: linear-gradient(95deg, rgba(76, 34, 120, 0.55), rgba(76, 34, 120, 0.12) 60%, transparent);
}

.company-quote {
  position: absolute;
  top: clamp(40px, 8vw, 76px);
  left: max(20px, calc(50% - 480px));
  z-index: 4;
  max-width: 540px;
  color: #fff;
  font-size: clamp(28px, 3.8vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 24px rgba(60, 20, 100, 0.35);
}

/* ---- round profile card ---- */
.company-profile {
  position: absolute;
  right: max(20px, calc(50% - 520px));
  bottom: max(24px, 9%);
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: calc(100% - 40px);
  padding: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 24px 50px -20px rgba(40, 10, 80, 0.55);
}

.company-avatar {
  position: relative;
  flex: none;
  width: 80px;
  height: 80px;
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--pink), var(--violet), var(--blue));
}

/* online dot */
.company-avatar::after {
  content: "";
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 16px;
  height: 16px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #34c759;
}

.company-portrait {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 3px solid #fff;
  border-radius: 50%;
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding-right: 4px;
}

.company-name {
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.company-role {
  color: var(--mute);
  font-size: var(--fs-xs);
  white-space: nowrap;
}

.company-action {
  margin-left: 4px;
}

@media (max-width: 900px) {
  .company-profile { right: 20px; }
}

@media (max-width: 640px) {
  .company-frame { --scene-h: clamp(460px, 90vw, 540px); }

  .company-quote {
    top: clamp(28px, 7vw, 42px);
    right: 20px;
    left: 20px;
    max-width: none;
    font-size: clamp(26px, 7vw, 30px);
  }

  .company-profile {
    right: 20px;
    top: clamp(210px, 48vw, 280px);
    bottom: auto;
    left: 20px;
    flex-wrap: wrap;
    gap: 12px;
    padding: clamp(12px, 4vw, 16px);
    border-radius: 32px;
  }

  .company-info { flex: 1; }
  .company-action { width: 100%; margin: 0; }
  .company-action > a { width: 100%; }
}`;

const content = {
  quote: "“NOVA changed the way our team works. Everything feels simpler, faster, and more connected.”",
  name: "Alex Morgan",
  role: "Head of Operations",
  cta: "Read Their Story",
  image: { src: "/images/quote.jpg", alt: "Lavender rows on green hills under a pink and violet sky" },
  portrait: "/images/portrait.jpg",
};

export default function Company() {
  return (
    <>
      <style href="ov-company" precedence="default">{css}</style>
      <section className="company" id="company">
        <Scene className="company-frame">
          <ParallaxImage src={content.image.src} alt={content.image.alt} />
          <SplitText as="blockquote" className="company-quote" text={content.quote} />

          <div className="company-profile">
            <div className="company-avatar">
              <div className="company-portrait">
                <Image
                  src={content.portrait}
                  alt={`Portrait of ${content.name}`}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover", objectPosition: "57% 50%" }}
                />
              </div>
            </div>
            <div className="company-info">
              <strong className="company-name">{content.name}</strong>
              <span className="company-role">{content.role}</span>
            </div>
            <div className="company-action">
              <Button href="#resources">{content.cta}</Button>
            </div>
          </div>
        </Scene>
      </section>
    </>
  );
}
