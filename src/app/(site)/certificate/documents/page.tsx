import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

// Moved here from verify.graticus.com/business, which now redirects to this page.
export const metadata: Metadata = {
  title: "Document Certificate — Graticus",
  description:
    "Prove a contract, model, specification or test protocol existed, unchanged, by a given time, in a form anyone can check without trusting you or Graticus.",
};

const groups: [string, [string, string][]][] = [
  [
    "Legal and intellectual property",
    [
      ["Inventions before filing", "Fix invention disclosures, lab notebooks and design files as they are created, as evidence of what you had and when, ahead of any patent filing."],
      ["Trade secrets and know-how", "Show that a process, formula or source file existed in a given form by a date, without disclosing it to anyone until you choose to."],
      ["The agreed version of a contract", "Fix the version both sides signed, so a later dispute about which text was agreed has a clear answer."],
      ["Creative work and copyright", "Fix manuscripts, designs, code and other original work at the point of creation, as evidence of when it existed."],
      ["Evidence as collected", "Fix documents, exports and recordings when they are gathered, so it can be shown later that they were not altered afterward."],
    ],
  ],
  [
    "Finance and audit",
    [
      ["Models and valuations", "Fix the model and its assumptions on the valuation date, so nobody can question later whether the inputs were adjusted with hindsight."],
      ["Board and committee papers", "Fix papers exactly as circulated before a meeting, so the record shows what the board actually saw."],
      ["Forecasts and investment theses", "Fix a forecast or thesis before the outcome is known, building a track record that can't be rewritten."],
      ["Audit files at sign-off", "Fix working papers and evidence at sign-off, so any later change to the archived file is detectable."],
      ["Policies in force", "Show which version of a policy, procedure or disclosure was in force on a given date."],
    ],
  ],
  [
    "Engineering and regulated manufacturing",
    [
      ["Test protocols before testing", "Fix acceptance criteria and test protocols before a test runs, so results can't be judged against goalposts moved afterward. This matters in medical devices, aerospace and other regulated work."],
      ["Validation plans", "Fix validation and qualification protocols when they are approved, before execution begins."],
      ["Specifications at design freeze", "Fix the specification, drawings and bill of materials at each design freeze, as a clear baseline for change control."],
      ["Supplier and customer specifications", "Fix the specification a supplier quoted against or a customer approved, so both sides can show which version applied."],
      ["Records at handover", "Fix as-built drawings, test results and handover packs at delivery, so the condition at handover is beyond dispute."],
    ],
  ],
];

export default function DocumentCertificatePage() {
  return (
    <SubPage cta={{ href: "https://verify.graticus.com", label: "Check a certificate" }}>
      <div className="label">Document Certificate · Any industry</div>
      <h1>
        Prove a document existed, <em>unchanged, by a given time.</em>
      </h1>
      <p className="lede">
        Fix a contract, a financial model, a specification or a test protocol in time. Anyone you choose can
        later confirm it is exactly the version that existed then, down to the last character, without having
        to trust you or Graticus.
      </p>
      <div className="page-actions">
        <a className="btn-primary" href="https://verify.graticus.com">
          Check a certificate · no account needed
        </a>
        <a className="btn-secondary" href="mailto:hello@graticus.com">
          Ask about access
        </a>
      </div>
      <p className="note">
        Running a clinical trial? The <a href="/certificate">Pre-Specification Certificate</a> adds what
        trials need.
      </p>

      <h2>The problem it solves</h2>
      <p>
        Disputes often turn on a simple question: which version existed, and when? A file&rsquo;s &ldquo;last
        modified&rdquo; date, a date typed on the first page or a folder of emails can all be changed or argued
        over. Proving afterward that a document was not quietly edited is hard, and it gets harder the more is
        at stake.
      </p>
      <p>
        A Document Certificate settles it in advance. Once a document is fixed, any later change, even one
        character, shows. The proof doesn&rsquo;t depend on our records, so it can&rsquo;t be backdated by
        anyone, including us.
      </p>

      <h2>How it works</h2>
      <ol className="num-steps">
        <li>
          <strong>Fix the document.</strong> Your computer calculates the document&rsquo;s fingerprint, a
          64-character code unique to that exact file. Only the fingerprint is sent. The document never leaves
          your computer, so confidential material stays confidential. The fingerprint is fixed in time in two
          independent ways: a timestamp signed by Sectigo, an EU-qualified timestamp authority, and an entry in
          the public Bitcoin blockchain, which nobody can alter afterward.
        </li>
        <li>
          <strong>Share it when you need to.</strong> Send the document with its proof file to whoever needs to
          check: a counterparty, an auditor, a regulator, a court or an investor. A PDF certificate gives them
          the same details in readable form.
        </li>
        <li>
          <strong>They check it themselves with Certificate Check</strong>, with no account. The document shows
          green if it is exactly the file that was fixed, and red if anything has changed. The check runs in
          their own browser, and the page works saved to their computer with no connection to Graticus.
        </li>
      </ol>

      {groups.map(([title, items]) => (
        <section key={title}>
          <h2>{title}</h2>
          <div className="use-grid">
            {items.map(([t, d]) => (
              <div key={t} className="use">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <h2>What a certificate proves, and what it doesn&rsquo;t</h2>
      <div className="proves-grid">
        <div className="proves">
          <strong>It proves</strong>
          <ul>
            <li>The document existed in exactly this form no later than the time shown.</li>
            <li>Any later change to it, however small, is detectable.</li>
          </ul>
        </div>
        <div className="limits">
          <strong>It doesn&rsquo;t prove</strong>
          <ul>
            <li>Who wrote the document, or that its content is correct or complete.</li>
            <li>That the document didn&rsquo;t exist earlier. It shows the latest time it could have been created, not the first.</li>
            <li>
              What legal weight it carries in a particular case. That depends on the jurisdiction and the
              dispute, so take advice where it matters.
            </li>
          </ul>
        </div>
      </div>

      <h2>Questions</h2>
      <div className="faq">
        <details>
          <summary>Do you see or store our documents?</summary>
          <p>
            No. The fingerprint is calculated in your browser, and only the fingerprint is sent. A fingerprint
            can&rsquo;t be turned back into the document. Anyone checking needs the document from you.
          </p>
        </details>
        <details>
          <summary>What if Graticus disappears?</summary>
          <p>
            Your certificates still check out. Certificate Check can be saved and opened from any computer, and
            the proofs rest on a public timestamp authority and the Bitcoin blockchain, not on our servers. The
            page also explains how to check every proof with standard tools.
          </p>
        </details>
        <details>
          <summary>Why does a re-saved copy show red?</summary>
          <p>
            The check compares the exact file. Opening a document and saving it again, even unchanged, alters
            its contents, so its fingerprint no longer matches. Keep the copy you fixed in a folder of its own
            and send that copy.
          </p>
        </details>
        <details>
          <summary>Which timestamp authority do you use?</summary>
          <p>
            Sectigo, whose qualified timestamp service is on the EU trusted list under the eIDAS regulation.
            In the EU, a qualified timestamp carries a legal presumption that its date and time are accurate.
            Each certificate also carries a Bitcoin proof, which doesn&rsquo;t depend on any authority.
          </p>
        </details>
        <details>
          <summary>Is this the same as the clinical trial certificate?</summary>
          <p>
            It uses the same proofs. The <a href="/certificate">Pre-Specification Certificate</a> adds what
            trials need: milestones such as unblinding, and a certificate covering every document in the trial.
            The Document Certificate fixes any single document on its own.
          </p>
        </details>
        <details>
          <summary>How do I start?</summary>
          <p>
            Write to <a href="mailto:hello@graticus.com">hello@graticus.com</a> to ask about access. Existing
            users <a href="https://verify.graticus.com/app/">sign in</a> and open Documents.
          </p>
        </details>
      </div>
    </SubPage>
  );
}
