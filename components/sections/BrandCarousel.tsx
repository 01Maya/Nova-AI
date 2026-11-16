import Reveal from "@/components/ui/Reveal";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.brands {
  padding-top: 40px;
  text-align: center;
}

.brands-label {
  margin-bottom: clamp(16px, 2.5vw, 24px);
  color: var(--mute);
  font-size: var(--fs-xs);
}

/* fades the edges so logos glide in and out */
.brands-view {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

/* two identical sets side by side; sliding by -50% loops seamlessly */
.brands-track {
  display: flex;
  width: max-content;
  animation: brands-slide 32s linear infinite;
  will-change: transform;
}

@keyframes brands-slide {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

.brands-set {
  display: flex;
  flex: none;
  padding: 0;
  list-style: none;
}

.brands-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 clamp(20px, 4.5vw, 60px);
  color: #2a2a30;
  font-size: var(--fs-md);
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.3s, transform 0.4s var(--ease);
}

.brands-item:hover {
  color: var(--ink);
  transform: translateY(-2px);
}

/* brand marks are pure CSS shapes */
.brands-l1 {
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #7a8197, #2b2f3a);
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

.brands-l2 {
  width: 24px;
  height: 12px;
  background:
    radial-gradient(circle at 7px 6px, transparent 3px, currentColor 3px 5.5px, transparent 5.5px),
    radial-gradient(circle at 17px 6px, transparent 3px, currentColor 3px 5.5px, transparent 5.5px);
}

.brands-l3 {
  width: 16px;
  height: 14px;
  transform: skewX(-12deg);
  background:
    linear-gradient(currentColor, currentColor) 0 0 / 100% 3px no-repeat,
    linear-gradient(currentColor, currentColor) 0 5.5px / 70% 3px no-repeat,
    linear-gradient(currentColor, currentColor) 0 11px / 100% 3px no-repeat;
}

@media (max-width: 640px) {
  .brands { padding-top: clamp(24px, 6vw, 36px); }
}

/* reduced motion: show the brands as a static, wrapped row */
@media (prefers-reduced-motion: reduce) {
  .brands-view { mask-image: none; -webkit-mask-image: none; }
  .brands-track { width: auto; flex-wrap: wrap; justify-content: center; }
  .brands-set { flex-wrap: wrap; justify-content: center; }
  .brands-set[aria-hidden="true"] { display: none; }
}`;

const content = {
  label: "Trusted by teams building what's next",
  brands: [
    { name: "Vercel", icon: "l1" },
    { name: "Linear", icon: "l2" },
    { name: "Notion", icon: "l3" },
    { name: "Framer", icon: "l1" },
    { name: "Sisyphus", icon: "l2" },
  ],
};

/** Infinite marquee: the brand list is rendered twice and the track slides by -50%. */
export default function BrandCarousel() {
  const brands = [...content.brands, ...content.brands]; // repeat so one set is wider than the view

  const renderSet = (duplicate: boolean) => (
    <ul className="brands-set" aria-hidden={duplicate || undefined}>
      {brands.map((brand, i) => (
        <li className="brands-item" key={i}>
          <i className={`brands-${brand.icon}`} />
          {brand.name}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <style href="ov-brands" precedence="default">{css}</style>
      <div className="wrap">
        <Reveal className="brands">
          <p className="brands-label">{content.label}</p>
          <div className="brands-view" role="region" aria-label={content.label}>
            <div className="brands-track">
              {renderSet(false)}
              {renderSet(true)}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
