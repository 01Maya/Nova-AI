/* Component styles (rendered once via a hoisted <style>) */
const css = `.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-sm);
  font-weight: 500;
}

.logo-bars {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 20px;
}

.logo-bars i {
  width: 3px;
  height: var(--h);
  border-radius: 2px;
  background: var(--ink);
}

.logo-bars i:nth-child(1),
.logo-bars i:nth-child(5) { --h: 8px; }
.logo-bars i:nth-child(2),
.logo-bars i:nth-child(4) { --h: 14px; }
.logo-bars i:nth-child(3) { --h: 20px; }

.logo-bars i:nth-child(2) { animation-delay: 0.15s; }
.logo-bars i:nth-child(3) { animation-delay: 0.3s; }
.logo-bars i:nth-child(4) { animation-delay: 0.45s; }
.logo-bars i:nth-child(5) { animation-delay: 0.6s; }

/* calm by default: the mark only animates on hover */
.logo:hover .logo-bars i {
  animation: logo-bar 1.2s ease-in-out infinite;
}

@keyframes logo-bar {
  50% { transform: scaleY(0.45); }
}`;


type LogoProps = { href?: string; label?: string };

export default function Logo({ href = "#top", label }: LogoProps) {
  return (
    <>
      <style href="ov-logo" precedence="default">{css}</style>
      <a className="logo" href={href} aria-label={label}>
        <span className="logo-bars" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </span>
        NOVA AI
      </a>
    </>
  );
}
