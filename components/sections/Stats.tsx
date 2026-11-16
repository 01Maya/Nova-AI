import Counter from "@/components/ui/Counter";
import Reveal, { SplitText } from "@/components/ui/Reveal";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.stats {
  padding-top: var(--sec);
  text-align: center;
}

.stats-title {
  margin-bottom: clamp(24px, 4vw, 36px);
  font-size: var(--fs-h2);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(10px, 2vw, 16px);
  text-align: left;
}

.stats-card {
  position: relative;
  padding: clamp(16px, 2.5vw, 24px);
  overflow: hidden;
  border-radius: var(--r-sm);
  background: var(--soft);
  transition: translate 0.5s var(--ease), box-shadow 0.5s, background 0.4s;
}

.stats-card:hover {
  translate: 0 -6px;
  background: #fff;
  box-shadow: 0 0 0 1px var(--line), 0 20px 40px -18px rgba(150, 110, 240, 0.5);
}

.stats-value {
  display: block;
  margin: 4px 0 clamp(10px, 2vw, 16px);
  font-size: var(--fs-stat);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}

.stats-label {
  color: var(--mute);
  font-size: var(--fs-xs);
}

@media (max-width: 560px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stats-card {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0 16px;
  }

  .stats-value {
    margin-bottom: 0;
  }
}`;

const content = {
  title: "A smarter way to get things done.",
  items: [
    { value: 4, decimals: 0, suffix: "×", label: "Faster task completion" },
    { value: 85, decimals: 0, suffix: "%", label: "Less repetitive work" },
    { value: 2.5, decimals: 1, suffix: "×", label: "More productive teams" },
  ],
};

export default function Stats() {
  return (
    <>
      <style href="ov-stats" precedence="default">{css}</style>
      <section className="wrap stats" id="resources">
        <SplitText className="stats-title" text={content.title} />

        <div className="stats-grid">
          {content.items.map((stat, i) => (
            <Reveal className="stats-card" delay={i} key={stat.label}>
              <b className="stats-value">
                <Counter value={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </b>
              <small className="stats-label">{stat.label}</small>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
