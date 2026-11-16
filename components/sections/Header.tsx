"use client";
import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { useSignup } from "@/components/ui/SignupDialog";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  padding: max(10px, env(safe-area-inset-top, 0px)) 0 10px;
  transition: background 0.4s, box-shadow 0.4s;
}

/* frosted bar once the page scrolls */
.header-stuck {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 var(--line);
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.header-links {
  display: flex;
  gap: 22px;
  padding: 0;
  list-style: none;
}

.header-links a {
  position: relative;
  display: inline-block;
  padding: 6px 0;
}

.header-links a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease);
}

.header-links a:hover::after {
  transform: scaleX(1);
}

.header-chevron {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-left: 7px;
  border: solid currentColor;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.3s var(--ease);
}

.header-links a:hover .header-chevron {
  transform: rotate(225deg) translate(-1px, -1px);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-burger {
  position: relative;
  display: none;
  width: 44px;
  height: 44px;
  border: 0;
  background: none;
  cursor: pointer;
}

.header-line {
  position: absolute;
  right: 12px;
  left: 12px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.35s var(--ease);
}

.header-line:nth-child(1) { top: 17px; }
.header-line:nth-child(2) { top: 25px; }

.header-burger[aria-expanded="true"] .header-line:nth-child(1) { transform: translateY(4px) rotate(45deg); }
.header-burger[aria-expanded="true"] .header-line:nth-child(2) { transform: translateY(-4px) rotate(-45deg); }

@media (max-width: 900px) {
  .header-links,
  .header-login,
  .header-cta {
    display: none;
  }

  .header-burger {
    display: block;
  }

  .header-links.header-open {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px clamp(16px, 5vw, 24px) 20px;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(14px);
    box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.2);
    font-size: var(--fs-md);
    animation: header-drop 0.4s var(--ease);
  }
}

@keyframes header-drop {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
}`;

const content: {
  logoLabel: string;
  links: { label: string; href: string; chevron?: boolean }[];
  login: string;
  cta: string;
} = {
  logoLabel: "NOVA AI home",
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#usecases" },
    { label: "Company", href: "#company" },
    { label: "Resources", href: "#resources" },
  ],
  login: "Sign up",
  cta: "Get Started Free",
};

export default function Header() {
  const { open } = useSignup();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(scrollY > 20);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("keydown", onKey);
    };
  }, []);

  const openSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    open();
  };

  return (
    <>
      <style href="ov-header" precedence="default">{css}</style>
      <header id="top" className={cx("header", stuck && "header-stuck")}>
        <nav className={cx("wrap", "header-nav")} aria-label="Primary">
          <Logo label={content.logoLabel} />

          <ul id="nav-links" className={cx("header-links", menuOpen && "header-open")}>
            {content.links.map(({ label, href, chevron }) => (
              <li key={label}>
                <a href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                  {chevron && <i className="header-chevron" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="header-actions">
            <a className="header-login" href="#top" onClick={openSignup}>{content.login}</a>
            <div className="header-cta">
              <Button size="sm" signup>{content.cta}</Button>
            </div>
            <button
              className="header-burger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="nav-links"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <i className="header-line" />
              <i className="header-line" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
