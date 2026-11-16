import Logo from "@/components/ui/Logo";

/* Component styles (rendered once via a hoisted <style>) */
const css = `.footer {
  padding: var(--sec) 0 clamp(24px, 4vw, 40px);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 1fr;
  gap: clamp(24px, 4vw, 40px);
}

.footer-heading {
  margin-bottom: 18px;
  font-size: var(--fs-sm);
}

.footer-description {
  max-width: 240px;
  margin-top: 12px;
  color: #555;
}

.footer-list {
  display: grid;
  gap: 14px;
  padding: 0;
  list-style: none;
  color: #555;
}

.footer-list a {
  transition: color 0.25s, padding 0.3s var(--ease);
}

.footer-list a:hover {
  padding-left: 5px;
  color: var(--ink);
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-top: clamp(36px, 6vw, 60px);
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--mute);
  font-size: var(--fs-xs);
}

.footer-legal span a {
  margin-left: 0;
}

.footer-legal span:last-child {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
}

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .footer-sign { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .footer { padding: clamp(48px, 12vw, 72px) 0 24px; }
  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 20px;
  }
  .footer-sign,
  .footer-grid > div:last-child {
    grid-column: 1 / -1;
  }
  .footer-heading { margin-bottom: 12px; }
  .footer-list { gap: 10px; }
  .footer-legal {
    flex-direction: column;
    gap: 12px;
    margin-top: 36px;
    padding-top: 16px;
  }
}`;

const content = {
  description: "Your intelligent workspace for better work.",
  columns: [
    { title: "Company", links: [["About", "#company"], ["Careers", "#company"], ["Contact", "#cta"]] },
    { title: "Product", links: [["Features", "#features"], ["Integrations", "#features"], ["Pricing", "#cta"]] },
    { title: "Resources", links: [["Help Center", "#resources"], ["Documentation", "#resources"], ["Community", "#resources"]] },
  ],
  legal: ["Terms of Service", "Privacy Policy"],
  copyright: "© 2026 NOVA AI. All rights reserved.",
};

export default function Footer() {
  return (
    <>
      <style href="ov-footer" precedence="default">{css}</style>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-sign">
              <Logo />
              <p className="footer-description">{content.description}</p>
            </div>

            {content.columns.map((column) => (
              <div key={column.title}>
                <h3 className="footer-heading">{column.title}</h3>
                <ul className="footer-list">
                  {column.links.map(([label, href]) => (
                    <li key={label}><a href={href}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-legal">
            <span>{content.copyright}</span>
            <span>{content.legal.map((item) => <a key={item} href="#top">{item}</a>)}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
