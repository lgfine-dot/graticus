import Graticule from "@/components/Graticule";
import ContactForm from "@/components/ContactForm";
import InterestLink from "@/components/InterestLink";
import { priceLines, type PriceId } from "@/content/pricing";

/*
 * Three offerings, each orderable on its own.
 *
 * "PharmaSim" is gone. It was retired on 1 September because the name is
 * already an Interpretive Simulations marketing simulation taught in MBA
 * courses — a business-school buyer may well have used the other one. Graticus
 * is the single parent brand, and the products underneath it are named by what
 * they do rather than by sub-brands that have to be defended.
 *
 * Each offering now carries its own price. A small-pharma reader's first
 * question is whether a company of eleven can afford this at all, and a page
 * that answers it only after an email exchange loses the readers who assumed
 * the answer was no.
 *
 * No figure is typed into this file. Offerings name price ids and the numbers
 * come from src/content/pricing.ts, which also explains why the academic rate
 * is defined there but never rendered here.
 */
type Offering = {
  num: string;
  title: string;
  paras: string[];
  groups: { label: string; items: string[] }[];
  /* Ids only. The figures live in src/content/pricing.ts so a price change is
     one edit there rather than a hunt through the markup. */
  prices?: readonly PriceId[];
  priceNote?: string;
  actions: { label: string; area: string; message?: string }[];
  secondary?: { label: string; href: string };
};

const offerings: Offering[] = [
  {
    num: "01 · Protocol Generator",
    title: "From a structure to a development brief in under three minutes.",
    paras: [
      "Give it a compound name, upload a structure image, or draw it. Nothing generates until you confirm the structure is the one you meant. Then the Protocol Generator pulls the evidence — PubChem, ChEMBL, Europe PMC, ClinicalTrials.gov, EPO patent records — builds a citation register, and writes a nine-section development brief you can put in front of a partner.",
    ],
    groups: [
      {
        label: "What you get",
        items: [
          "A versioned Word document with a full citation register attached",
          "Executive summary, compound profile, target product profile, comparable compounds, development considerations, IP and risk landscape, open questions",
          "Every claim traced to a registered source. A section citing something ungrounded is regenerated once, then failed rather than shipped.",
          "A development plan that is not written by a model — it comes from a regulatory rules engine and a critical-path scheduler, so nothing in the schedule can be invented",
          "The plan converts into a real project: a typical small-molecule program to IND/CTA-ready lands at roughly 30 milestones and 230 tasks across 252 days, with the critical path marked",
        ],
      },
      {
        label: "On your molecule",
        items: [
          "It never touches our pharma business. It does go to public chemistry, literature and patent databases, and to the model that writes the prose. Every customer runs on their own deployment, and we put the data handling in writing before you upload anything.",
          "A support tool, not the last word. The brief gets a competent team to the starting line faster with every claim traceable and every gap named. Your scientist, your regulatory lead and your patent attorney still decide.",
        ],
      },
    ],
    prices: ["P1", "P2", "P3"],
    actions: [
      {
        label: "See a sample brief",
        area: "Protocol Generator",
        message: "Please send the sample development brief.",
      },
      { label: "Request access", area: "Protocol Generator" },
    ],
  },
  {
    num: "02 · Training",
    title: "Make the expensive decisions in a simulation first.",
    paras: [
      "Thirteen decision simulations that put your team in the chair with a runway, a molecule and a call to make. Each one teaches before the decision and explains the reasoning after it, so people leave knowing why the strong answer was strong — not just which button was right.",
    ],
    groups: [
      {
        label: "What a simulation actually is",
        items: [
          "Four hours. Ten modules. Up to forty decisions. Not a quiz and not a webinar — long-form work, designed to be done across several sittings.",
          "Teaching comes before each decision. The reasoning comes after it.",
          "Progress saves. People pick up where they left off.",
        ],
      },
      {
        label: "Two tracks",
        items: [
          "Founder track — regulatory strategy, licensing, capital, exit",
          "Technology transfer track — written from the TTO side of the table",
          "Or the full catalogue: thirteen simulations, roughly fifty hours of decision practice",
          "Simulations can be tailored to your own programme",
        ],
      },
    ],
    prices: ["T1", "T2", "T3", "T4", "T5"],
    priceNote:
      "For context: a three-day industry conference costs about the same per person and produces twenty hours of sitting in rooms.",
    actions: [{ label: "Try a simulation", area: "Training" }],
    secondary: { label: "Sign in", href: "https://app.graticus.com" },
  },
  {
    num: "03 · Advisory",
    title: "Senior help at the point where most advisors go quiet.",
    paras: [
      "Licensing strategy, partner identification, deal structuring, regulatory and commercial pathway planning, and interim leadership — from people who have built and transacted in pharma, not just advised on it.",
    ],
    groups: [
      {
        label: "What you get",
        items: [
          "Licensing and out-licensing strategy",
          "Partner identification and deal structuring",
          "Regulatory and commercial pathway planning",
          "Interim leadership and fractional CBDO support",
        ],
      },
      {
        label: "How it works",
        items: [
          "We answer every enquiry within two business days",
          "We take on few engagements at a time so the ones we take on get the room",
        ],
      },
    ],
    prices: ["A1", "A2", "A3", "A4"],
    actions: [{ label: "Enquire", area: "Advisory" }],
  },
];

const principles = [
  {
    num: "01",
    title: "Graticule — we measure before we advise.",
    body:
      "A graticule is the crosshair inside a microscope. It is the quiet instrument by which something small becomes legible. We begin every engagement the same way: by looking carefully at where you actually are, not where you want to be.",
  },
  {
    num: "02",
    title: "Small pharma deserves enterprise-grade support.",
    body:
      "The tools and counsel that move molecules to market have historically been available only to large organizations, at five and six figures a year. We built Graticus to close that gap — because the best science is not always inside the largest companies.",
  },
  {
    num: "03",
    title: "Invictus — we hold the line when the work gets difficult.",
    body:
      "Programs stall. Funding tightens. Partners go quiet. Our value is highest at the exact moment most advisors become scarce. We stay in the room and do the work until the outcome is resolved.",
  },
  {
    num: "04",
    title: "Tools and strategy are not separable.",
    body:
      "The tools are not products we license and leave. What your team builds inside them informs every strategic conversation we have. Equally, each stands on its own — most customers take one and never need the rest.",
  },
];

/* Named where we do our best work, rather than listing every sector we could
   serve. The long tail moved to a single sentence underneath, and the
   disqualifier below that does more filtering work than any of it. */
const industries = [
  {
    name: "Pre-clinical and early-stage companies",
    body: "Taking a molecule toward a first partner conversation.",
  },
  {
    name: "Drug delivery and reformulation platforms",
    body:
      "Including 505(b)(2) programs, where the science is strong and the development path is the hard part.",
  },
  {
    name: "Technology transfer offices and university spin-outs",
    body: "Deciding which assets to move and how to structure the deal.",
  },
];

function Wordmark({ copperClass = "c" }: { copperClass?: string }) {
  return (
    <span className="name">
      graticus<span className={copperClass}>.</span>
    </span>
  );
}

export default function Home() {
  return (
    <>
      <nav className="top">
        <div className="inner">
          <a href="#" className="brand" aria-label="Graticus home">
            <Graticule size={32} style={{ color: "var(--blue-700)" }} />
            <Wordmark />
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#industries">Industries</a>
            <a href="#contact" className="nav-cta">
              Start a conversation
            </a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow">Built for small pharma</div>
          <h1>
            Enterprise-grade development work, <em>without the enterprise.</em>
          </h1>
          <p className="lede">
            Graticus gives small and emerging pharma teams three things large companies
            take for granted: a tool that turns a molecule into a fully cited development
            brief in under three minutes, thirteen four-hour simulations that let your team
            make the expensive decisions before they cost anything, and senior counsel when
            the call is hard.
          </p>
          <div className="hero-actions">
            <InterestLink
              className="btn-primary"
              interest={{
                area: "Protocol Generator",
                message: "Please send the sample development brief.",
              }}
            >
              See a sample brief
            </InterestLink>
            <a href="#contact" className="btn-secondary">
              Start a conversation
            </a>
          </div>
        </div>
        <svg
          className="hero-reticle"
          width="520"
          height="520"
          viewBox="0 0 96 96"
          style={{ color: "var(--blue-300)" }}
          aria-hidden="true"
        >
          <use href="#graticule" />
        </svg>
      </header>

      <div className="wrap">
        <div className="meta-row">
          <span>
            <span className="dot"></span> Protocol Generator
          </span>
          <span>
            <span className="dot"></span> Training
          </span>
          <span>
            <span className="dot"></span> Advisory
          </span>
          <span>Est. 2026 · Small Pharma</span>
        </div>
      </div>

      <section id="services">
        <div className="wrap">
          <div className="sec-header">
            <div className="label">01 / Services</div>
            <h2>
              Three offerings. One firm. Priced so a company of eleven can{" "}
              <em>actually buy them.</em>
            </h2>
          </div>
          <div className="offerings">
            {offerings.map((o) => (
              <article key={o.num} className="offering">
                <div className="offering-lead">
                  <div className="num">{o.num}</div>
                  <h3>{o.title}</h3>
                  {o.paras.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  <div className="offering-actions">
                    {o.actions.map((a) => (
                      <InterestLink
                        key={a.label}
                        className="service-action"
                        interest={{ area: a.area, message: a.message }}
                      >
                        {a.label}
                      </InterestLink>
                    ))}
                    {o.secondary && (
                      <a className="service-action muted" href={o.secondary.href}>
                        {o.secondary.label}{" "}
                        <span className="arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="offering-detail">
                  {o.groups.map((g) => (
                    <div key={g.label} className="detail-group">
                      <h4>{g.label}</h4>
                      <ul>
                        {g.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {o.prices && (
                    <div className="detail-group pricing">
                      <h4>Pricing</h4>
                      <dl>
                        {priceLines(o.prices).map((p) => (
                          <div key={p.id}>
                            <dt>
                              {p.label} — {p.price}
                            </dt>
                            {p.body && <dd>{p.body}</dd>}
                          </div>
                        ))}
                      </dl>
                      {o.priceNote && <p className="service-note">{o.priceNote}</p>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="approach">
        <div className="wrap">
          <div className="sec-header">
            <div className="label">02 / Approach</div>
            <h2>
              The name we chose is the <em>standard we hold.</em>
            </h2>
          </div>
          <div className="principles">
            {principles.map((p) => (
              <div key={p.num} className="principle">
                <div className="num">{p.num}</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="industries">
        <div className="wrap">
          <div className="sec-header">
            <div className="label">03 / Industries</div>
            <h2>
              Where we do our <em>best work.</em>
            </h2>
          </div>
          <div className="list">
            {industries.map((ind, i) => (
              <div key={ind.name} className="industry">
                <div className="lbl">{String(i + 1).padStart(2, "0")}</div>
                <div className="name">{ind.name}</div>
                <p>{ind.body}</p>
              </div>
            ))}
          </div>
          <div className="industry-notes">
            <p>
              We also work with specialty pharma, clinical-stage biotech, nutraceutical and
              OTC developers, and emerging-market pharma companies.
            </p>
            <p className="not-for">
              <strong>Who we are not for:</strong> large organizations that already have
              this infrastructure in place, and teams looking for someone to do the science
              for them. We sharpen the work; we do not replace the scientist.
            </p>
          </div>
        </div>
      </section>

      <section className="positioning">
        <div className="wrap">
          <blockquote>
            Precision is a <em>kind of respect.</em> It is the only way to honor the
            science — and the patients waiting at the end of it.
          </blockquote>
          <div className="cite">
            <span className="rule"></span>
            <span>Graticus · Founding Principle</span>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <h2>
                Start a <em>conversation.</em>
              </h2>
              <p className="lede">
                Tell us about your pipeline, your team, and the decision in front of you.
                We respond within two business days — usually faster.
              </p>
              <div className="meta-row" style={{ borderBottom: 0, paddingTop: 32 }}>
                <span>
                  <span className="dot"></span> hello@graticus.com
                </span>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="top-row">
            <div className="brand-block">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Graticule size={28} style={{ color: "var(--bone)" }} />
                <Wordmark />
              </div>
              <p>
                Purpose-built tools and advisory for small and emerging pharma companies.
              </p>
            </div>
            <div className="col">
              <h5>Offerings</h5>
              <a href="#services">Protocol Generator</a>
              <a href="#services">Training</a>
              <a href="#services">Advisory</a>
            </div>
            <div className="col">
              <h5>Firm</h5>
              <a href="#approach">Approach</a>
              <a href="#industries">Industries</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="col">
              <h5>Connect</h5>
              <a href="mailto:hello@graticus.com">hello@graticus.com</a>
              {/* LinkedIn is omitted until there is a real company page to point
                  at. A link to "#" reads as a broken site, which costs more
                  credibility than a missing row does. */}
            </div>
          </div>
          <div className="bottom-row">
            <span>© 2026 Graticus Advisory, LLC</span>
            <span>Measured · Unconquered</span>
          </div>
        </div>
      </footer>
    </>
  );
}
