
import Button from "@/components/ui/Button";
import Reveal, { SplitText } from "@/components/ui/Reveal";

/* Component styles */
const css = `
.statement {
  padding-top: var(--sec);
  text-align: center;
}

.statement-title {
  max-width: 600px;
  margin: 0 auto;
  font-size: var(--fs-h2);
  line-height: 1.1;
}

/* Assistant strip - Desktop */
.statement-strip {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: min(600px, 100%);
  margin: 44px auto 0;
  padding: 16px 20px;
  border-radius: var(--r-md);
  background: #fff;
  box-shadow:
    0 0 0 1px var(--line),
    0 8px 30px -14px rgba(0, 0, 0, 0.12);
  text-align: left;
  transition:
    box-shadow 0.4s var(--ease),
    translate 0.4s var(--ease);
}

.statement-strip:hover {
  translate: 0 -2px;
  box-shadow:
    0 0 0 1px var(--violet),
    0 18px 40px -16px rgba(122, 90, 248, 0.45);
}

/* Profile avatars */
.statement-faces {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding-left: 2px;
}

.statement-face {
  display: block;
  position: relative;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  margin-right: -12px;
  border: 2px solid #fff;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 2px 8px rgba(40, 30, 90, 0.18);
  transition:
    transform 0.4s var(--ease),
    margin 0.4s var(--ease),
    box-shadow 0.4s;
}

.statement-face:last-child {
  margin-right: 0;
}

.statement-faces:hover .statement-face {
  margin-right: -2px;
}

.statement-faces:hover .statement-face:last-child {
  margin-right: 0;
}

.statement-face:hover {
  z-index: 2;
  transform: translateY(-5px) scale(1.12);
  box-shadow:
    0 10px 20px -6px rgba(122, 90, 248, 0.55),
    0 0 0 3px rgba(201, 168, 245, 0.35);
}

/* Assistant text */
.statement-text {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  line-height: 1.3;
}

.statement-text small {
  display: block;
  margin-top: 3px;
  color: var(--mute);
  font-size: var(--fs-xs);
}

/* Button */
.statement-strip > .button {
  flex-shrink: 0;
}

/* Tablet */
@media (max-width: 768px) {
  .statement-strip {
    gap: 12px;
    padding: 14px;
  }

  .statement-face {
    width: 36px;
    height: 36px;
  }

  .statement-text {
    font-size: 15px;
  }
}

/* Mobile - Vertical layout */
@media (max-width: 480px) {
  .statement {
    padding-top: 56px;
  }

  .statement-title {
    font-size: clamp(29px, 8vw, 36px);
    line-height: 1.15;
  }

  .statement-strip {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 12px;

    width: 100%;
    margin: 28px auto 0;
    padding: 24px 18px;

    text-align: center;
  }

  /* 1. Avatars at top */
  .statement-strip > .statement-faces {
    order: 1;
    width: 100%;
    justify-content: center;
    margin: 0;
  }

  .statement-face {
    width: 42px;
    height: 42px;
  }

  /* 2. Text below avatars */
  .statement-strip > .statement-text {
    order: 2;
    flex: none;
    width: 100%;
    margin: 0;
    font-size: 16px;
    line-height: 1.4;
    text-align: center;
  }

  .statement-text small {
    margin-top: 4px;
    font-size: 13px;
    line-height: 1.5;
  }

  /* 3. Button below text */
  .statement-strip > .button {
    order: 3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: center;

    width: auto;
    min-width: 210px;
    max-width: 100%;
    margin: 4px 0 0;
  }
}

/* Small mobile */
@media (max-width: 360px) {
  .statement-strip {
    padding: 22px 14px;
    gap: 12px;
  }

  .statement-face {
    width: 38px;
    height: 38px;
  }

  .statement-text {
    font-size: 15px;
  }

  .statement-strip > .button {
    min-width: 190px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .statement-strip,
  .statement-face {
    transition: none;
  }
}
`;

const content = {
  text: "AI Productivity ensures every task, message, *and workflow is handled* automatically, anytime, *anywhere.",
  strip: {
    title: "Join thousands using AI daily",
    sub: "Get your AI Assistant in one click.",
    cta: "Get Your Assistant",
  },
};

export default function Statement() {
  return (
    <>
      <style href="ov-statement" precedence="default">
        {css}
      </style>

      <section className="wrap statement" id="usecases">
        <SplitText
          className="statement-title"
          text={content.text}
        />

        <Reveal className="statement-strip">
          <div className="statement-faces" aria-hidden="true">
            <img
              className="statement-face"
              src="/images/wd1.png"
              alt=""
            />
            <img
              className="statement-face"
              src="/images/wd2.png"
              alt=""
            />
            <img
              className="statement-face"
              src="/images/wd3.png"
              alt=""
            />
          </div>

          <p className="statement-text">
            {content.strip.title}
            <small>{content.strip.sub}</small>
          </p>

          <Button signup>
            {content.strip.cta}
          </Button>
        </Reveal>
      </section>
    </>
  );
}
