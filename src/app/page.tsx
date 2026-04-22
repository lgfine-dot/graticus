import Graticule from "@/components/Graticule";
import ContactForm from "@/components/ContactForm";

const services = [
  {
    num: "01 · AGCP Dashboard",
    title: "Regulatory and operational intelligence in one place.",
    description:
      "The AGCP Dashboard gives small pharma companies enterprise-grade visibility into their pipeline, regulatory status, and operations — without the enterprise headcount.",
    items: [
      "Regulatory intelligence and submission tracking",
      "Pipeline and formulation management",
      "Vendor and procurement oversight",
      "Data room and document control",
    ],
  },
  {
    num: "02 · PharmaSim",
    title: "Train your team without the trial-and-error cost.",
    description:
      "PharmaSim is a pharmaceutical simulation platform that lets your team run through licensing negotiations, regulatory submissions, and commercialization decisions in a no-risk environment.",
    items: [
      "Licensing and deal structure simulations",
      "Regulatory pathway decision training",
      "Commercialization and launch scenarios",
      "Onboarding for new scientific and commercial staff",
    ],
  },
  {
    num: "03 · Advisory",
    title: "Strategic support when the decisions are hardest.",
    description:
      "Experienced counsel on licensing strategy, partnership structuring, regulatory planning, and commercial execution — from a team that has built and transacted in pharma.",
    items: [
      "Licensing and out-licensing strategy",
      "Partner identification and deal structuring",
      "Regulatory and commercial pathway planning",
      "Interim leadership and fractional CBDO support",
    ],
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
      "The tools and counsel that move molecules to market have historically been available only to large organizations. We built Graticus to close that gap — because the best science is not always inside the largest companies.",
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
      "The AGCP Dashboard and PharmaSim are not products we license and leave. They are integrated into how we advise — so the intelligence your team builds inside them directly informs every strategic conversation we have together.",
  },
];

const industries = [
  "Pre-clinical & Early Stage",
  "Clinical-Stage Biotech",
  "Specialty Pharma",
  "Drug Delivery Platforms",
  "Nutraceutical & OTC",
  "505(b)(2) Programs",
  "Licensing & Out-licensing",
  "Emerging Market Pharma",
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
            The infrastructure small pharma <em>actually needs.</em>
          </h1>
          <p className="lede">
            Graticus gives small and emerging pharma companies the tools, training, and
            strategic support that were previously only available to large enterprises —
            purpose-built for teams with real science and limited bandwidth.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Start a conversation
              <span className="arrow">→</span>
            </a>
            <a href="#approach" className="btn-secondary">
              See our approach
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
            <span className="dot"></span> AGCP Dashboard
          </span>
          <span>
            <span className="dot"></span> PharmaSim
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
              Three offerings. One firm. Built around what small pharma teams{" "}
              <em>actually face.</em>
            </h2>
          </div>
          <div className="services">
            {services.map((s) => (
              <div key={s.num} className="service">
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
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
              We work with small and emerging pharma companies at every{" "}
              <em>stage of growth.</em>
            </h2>
          </div>
          <div className="list">
            {industries.map((name, i) => (
              <div key={name} className="industry">
                <div className="lbl">{String(i + 1).padStart(2, "0")}</div>
                <div className="name">{name}</div>
              </div>
            ))}
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
                Purpose-built tools and advisory for small and emerging pharma companies —
                the AGCP Dashboard, PharmaSim, and experienced strategic counsel.
              </p>
            </div>
            <div className="col">
              <h5>Offerings</h5>
              <a href="#services">AGCP Dashboard</a>
              <a href="#services">PharmaSim</a>
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
              <a href="#">LinkedIn</a>
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
