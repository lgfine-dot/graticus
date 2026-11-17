import Graticule from "@/components/Graticule";

/*
 * The frame for a plain content page (product explanations, the tools guide): the brand bar
 * with one call to action, the page's own content in the "report" layout, and the short footer.
 */
export default function SubPage({
  cta,
  wide = false,
  children,
}: {
  cta?: { href: string; label: string };
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="top">
        <div className="inner">
          <a href="/" className="brand" aria-label="Graticus home">
            <Graticule size={32} style={{ color: "var(--blue-700)" }} />
            <span className="name">
              graticus<span className="c">.</span>
            </span>
          </a>
          {cta ? (
            <div className="nav-links">
              <a href={cta.href} className="nav-cta">
                {cta.label}
              </a>
            </div>
          ) : null}
        </div>
      </nav>

      <main className="report">
        <div className={wide ? "wrap mid" : "wrap narrow"}>{children}</div>
      </main>

      <footer>
        <div className="wrap">
          <div className="bottom-row">
            <span>© 2026 AGCP Farmacêuticos, Lda</span>
            <span>
              <a href="/">graticus.com</a> · <a href="/guide">Free tools guide</a> ·{" "}
              <a href="mailto:hello@graticus.com">hello@graticus.com</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
