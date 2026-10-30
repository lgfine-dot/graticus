import type { Metadata } from "next";
import Graticule from "@/components/Graticule";
import { papers } from "@/content/papers";

/*
 * White papers, free to download: no form, no sign-in, no cookies. The list itself lives in
 * src/content/papers.ts so a new paper is a new entry there plus a PDF in public/papers/.
 *
 * openGraph is set in full here because Next replaces the layout's openGraph object rather than
 * merging into it; leaving out images would give LinkedIn no picture.
 */
const title = "Insights: white papers from Graticus";
const description =
  "White papers by Lawrence Fine on running small and emerging pharma companies. Free to download as PDF, no sign-up.";

export const metadata: Metadata = {
  title: `${title} — Graticus`,
  description,
  alternates: { canonical: "/insights" },
  openGraph: {
    title,
    description,
    url: "https://graticus.com/insights",
    siteName: "Graticus",
    images: [{ url: "/papers/og-insights.png", width: 1200, height: 630, alt: "Graticus Insights" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/papers/og-insights.png"],
  },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default function Insights() {
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
          <div className="nav-links">
            <a href="/#contact" className="nav-cta">
              Start a conversation
            </a>
          </div>
        </div>
      </nav>

      <main className="report">
        <div className="wrap narrow">
          <div className="label">Insights · White papers</div>
          <h1>
            Notes from <em>the work</em>
          </h1>
          <p className="lede">
            Longer pieces on running small and emerging pharma companies. Each one is a PDF, free to
            download. There is nothing to sign up for.
          </p>

          <ul className="papers">
            {papers.map((p) => (
              <li key={p.pdf} className="paper">
                <h2>{p.title}</h2>
                <div className="paper-meta">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{p.author}</span>
                </div>
                <p>{p.summary}</p>
                <a className="btn-primary" href={`/papers/${p.pdf}`} download>
                  Download PDF <span className="arrow">&darr;</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="about-line">
            Graticus is part of AGCP Farmacêuticos.{" "}
            <a href="https://www.linkedin.com/in/lawrence-fine-7065965" rel="noopener noreferrer" target="_blank">
              Lawrence Fine on LinkedIn
            </a>
          </p>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="bottom-row">
            <span>© 2026 AGCP Farmacêuticos, Lda</span>
            <a href="/">graticus.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
