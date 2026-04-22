import Graticule from "@/components/Graticule";
import ContactForm from "@/components/ContactForm";

const services = [
  {
    num: "01 · Technology",
    title: "Systems that scale with the science.",
    description:
      "Architecture, data platforms, and decision tools built for regulated environments — designed by people who have shipped them.",
    items: [
      "Data platform & clinical pipelines",
      "AI/ML evaluation & integration",
      "Compliance-ready cloud architecture",
      "Technical due diligence",
    ],
  },
  {
    num: "02 · Consulting",
    title: "Strategy grounded in the work.",
    description:
      "From commercial strategy to operating-model design, we work alongside leadership teams to translate ambition into executable plans.",
    items: [
      "Commercial & portfolio strategy",
      "Operating-model design",
      "Market entry & positioning",
      "Board & investor advisory",
    ],
  },
  {
    num: "03 · Management",
    title: "Hands-on leadership when it counts.",
    description:
      "Interim and fractional leadership for critical moments — product launches, turnarounds, transitions, and the first 100 days.",
    items: [
      "Interim & fractional executives",
      "Program & transformation leadership",
      "M&A integration",
      "Founding-team acceleration",
    ],
  },
];

const principles = [
  {
    num: "01",
    title: "Graticule — we take measurements before we take positions.",
    body:
      "A graticule is the crosshair inside a microscope. It is the quiet instrument by which something small becomes legible. We start every engagement the same way: by looking, carefully, at the specimen in front of us.",
  },
  {
    num: "02",
    title: "Gratitude — we remember whose work we are building on.",
    body:
      "Life sciences is a field of shoulders. Every molecule, protocol, and platform we touch exists because someone made it first. We name them, thank them, and work in their tradition.",
  },
  {
    num: "03",
    title: "Invictus — we hold the line when the work gets difficult.",
    body:
      "Drug programs fail. Platforms slip. Funding tightens. Our value is highest at the exact moment most advisors become scarce. Unconquered is not a slogan; it is a service level.",
  },
  {
    num: "04",
    title: "One practice — three disciplines, one accountable team.",
    body:
      "Technology, consulting, and management are not separable in real companies, so they are not separable in our engagements. One team, one plan, one set of outcomes we own.",
  },
];

const industries = [
  "Biotech & Pharma",
  "Medical Devices",
  "Diagnostics & Tools",
  "Digital Health",
  "Clinical Research",
  "Healthcare AI",
  "Venture & Growth",
  "Foundations & NFPs",
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
          <div className="eyebrow">Life sciences advisory</div>
          <h1>
            Measured decisions. <em>Unconquered</em> outcomes.
          </h1>
          <p className="lede">
            Graticus is a boutique advisory serving the life-sciences industry. We bring
            technology, consulting, and management together in one practice — so the teams
            building what comes next can move with precision and resolve.
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
            <span className="dot"></span> Technology
          </span>
          <span>
            <span className="dot"></span> Consulting
          </span>
          <span>
            <span className="dot"></span> Management
          </span>
          <span>Est. 2026 · Life Sciences</span>
        </div>
      </div>

      <section id="services">
        <div className="wrap">
          <div className="sec-header">
            <div className="label">01 / Services</div>
            <h2>
              A single practice for the three things <em>life-sciences teams</em> most often
              need at once.
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
              The name we chose is the <em>work we do.</em>
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
              We work with operators and investors across <em>life sciences.</em>
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
            Precision is a <em>kind of gratitude.</em> It is the only way to honor a field
            that took a century to get here.
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
                Tell us about the decision you are facing. We read every note, and respond
                within two business days — usually faster.
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
                A boutique advisory bringing technology, consulting, and management together
                for life-sciences teams.
              </p>
            </div>
            <div className="col">
              <h5>Services</h5>
              <a href="#services">Technology</a>
              <a href="#services">Consulting</a>
              <a href="#services">Management</a>
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
