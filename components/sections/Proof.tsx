import Counter from "@/components/ui/Counter";
import Reveal, { SplitText } from "@/components/ui/Reveal";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.proof {
  padding-top: var(--sec);
}

.proof-title {
  font-size: var(--fs-h3);
}

.proof-users {
  margin: 8px 0 clamp(14px, 2.5vw, 24px);
  font-size: var(--fs-md);
}

.proof-rule {
  border: 0;
  border-top: 1px solid var(--line);
}

.proof-big {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: clamp(10px, 2vw, 14px);
  padding-top: clamp(24px, 5vw, 44px);
}

.proof-bigValue {
  font-size: var(--fs-xl);
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.proof-bigLabel {
  color: var(--mute);
  font-size: var(--fs-lg);
  letter-spacing: -0.02em;
}`;

const content = {
  title: "Real people. Real productivity.",
  users: 20000,
  usersLabel: "Happy Users",
  tasks: 26900789,
  tasksLabel: "Tasks Completed",
};

export default function Proof() {
  return (
    <>
      <style href="ov-proof" precedence="default">{css}</style>
      <section className="wrap proof">
        <SplitText className="proof-title" text={content.title} />

        <Reveal as="p" className="proof-users">
          <Counter value={content.users} />+ {content.usersLabel}
        </Reveal>

        <hr className="proof-rule" />

        <Reveal className="proof-big">
          <b className="proof-bigValue">
            <Counter value={content.tasks} duration={2600} />
          </b>
          <span className="proof-bigLabel">{content.tasksLabel}</span>
        </Reveal>
      </section>
    </>
  );
}
