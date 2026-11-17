import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

// Moved here from verify.graticus.com (whose root is now the checker itself). The old address,
// verify.graticus.com/about, redirects to this page.
export const metadata: Metadata = {
  title: "Pre-Specification Certificate — Graticus",
  description:
    "Prove that a clinical trial's protocol, analysis plan and other key documents were fixed before the moments that matter, in a form anyone can check without trusting Graticus.",
};

const uses = [
  ["Protocol before first patient", "Show the protocol and primary endpoint were set before enrollment began, and that any later version came with a recorded reason."],
  ["Analysis plan before unblinding", "Show the statistical analysis plan was fixed before anyone saw unblinded data, the point where outcome-switching concerns usually arise."],
  ["Randomization list before randomizing", "Show the allocation list existed, unchanged, before the first patient was randomized."],
  ["A clean amendment trail", "Every new version is recorded alongside the one it replaces, with its reason and the date it takes effect. Nothing is overwritten or deleted."],
  ["Database lock and topline results", "Fix the database-lock certificate and the topline results at the moment they exist, so the sequence of events is beyond dispute."],
  ["Partner attestation", "Invite the CRO or statistician who wrote a document to confirm, on the record, that it is theirs in this exact form."],
];

const audiences = [
  ["Sponsors, including small biotech and pharma", "Evidence of good practice to hand to partners, investors, regulators and journals, without sharing confidential documents with us."],
  ["CROs, statisticians and trial sites", "Invited onto a trial record to add the documents they prepared and attest the ones they wrote."],
  ["Journal editors and peer reviewers", "Confirm that the analysis reported matches a plan fixed in advance."],
  ["Regulators and auditors", "Check document integrity and sequence independently, using open standards."],
  ["Investors, licensing partners and acquirers", "Due diligence on a program's data: was the plan fixed before the readout?"],
];

export default function CertificatePage() {
  return (
    <SubPage cta={{ href: "https://verify.graticus.com", label: "Check a certificate" }}>
      <div className="label">Pre-Specification Certificate · Clinical trials</div>
      <h1>
        Prove your trial documents were fixed <em>before the results were known.</em>
      </h1>
      <p className="lede">
        The Pre-Specification Certificate records exactly which protocol, analysis plan and other key
        documents a clinical trial had, and when, so anyone can later confirm they were not changed after
        the fact. Nobody has to take Graticus&rsquo;s word for it: the proof checks out independently.
      </p>
      <div className="page-actions">
        <a className="btn-primary" href="https://verify.graticus.com">
          Check a certificate · no account needed
        </a>
        <a className="btn-secondary" href="https://verify.graticus.com/app/">
          Issue certificates (sign in)
        </a>
      </div>
      <p className="note">
        Been sent a certificate? You don&rsquo;t need an account. Open{" "}
        <a href="https://verify.graticus.com">Certificate Check</a> and drop in the certificate and the
        documents. Signing in is only for those who issue certificates. Not a clinical trial?{" "}
        <a href="/certificate/documents">The same proof works for contracts, models, specifications and test protocols.</a>
      </p>

      <h2>The problem it solves</h2>
      <p>
        A trial&rsquo;s conclusions are only as trustworthy as the plan written before the data came in. If
        the primary endpoint, the analysis or the randomization list could have been adjusted after anyone
        saw the results, the findings are open to doubt. Reviewers, regulators, journals and partners
        increasingly ask sponsors to <strong>show</strong>, not just say, that the plan came first.
      </p>
      <p>
        Dates typed into a document, a file&rsquo;s &ldquo;last modified&rdquo; time or an email trail can all
        be changed or disputed. A Pre-Specification Certificate gives you evidence that can&rsquo;t be
        quietly backdated, including by us.
      </p>

      <h2>How it works</h2>
      <ol className="num-steps">
        <li>
          <strong>Record the trial&rsquo;s milestones</strong>, such as first patient enrolled, database lock and
          unblinding. Planned dates are fine and can be corrected; every correction stays on the record.
        </li>
        <li>
          <strong>Add each document before its milestone.</strong> Your computer calculates the document&rsquo;s
          fingerprint, a 64-character code unique to that exact file. Only the fingerprint is sent; the
          document itself never leaves your computer. The fingerprint is then fixed in time in two
          independent ways: a timestamp signed by Sectigo, an EU-qualified timestamp authority, and an entry
          in the public Bitcoin blockchain, which nobody can alter afterward.
        </li>
        <li>
          <strong>Issue a certificate and share it.</strong> The certificate lists every document, its
          fingerprint, when it was fixed, and whether that was before its milestone. Send it with the
          documents to whoever needs to check.
        </li>
        <li>
          <strong>Anyone checks it with Certificate Check</strong>, with no account, by dropping in the
          certificate and the documents. Each document shows green if it is exactly the file that was fixed,
          and red if even one character has changed. The check runs in their own browser, and the page also
          works saved to their computer with no connection to Graticus.
        </li>
      </ol>

      <h2>What you can use it for</h2>
      <div className="use-grid">
        {uses.map(([t, d]) => (
          <div key={t} className="use">
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>

      <h2>Who it is for</h2>
      <div className="table-scroll">
        <table className="plain-table">
          <thead>
            <tr>
              <th>Who</th>
              <th>How it helps</th>
            </tr>
          </thead>
          <tbody>
            {audiences.map(([w, h]) => (
              <tr key={w}>
                <td>
                  <strong>{w}</strong>
                </td>
                <td>{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>What a certificate proves, and what it doesn&rsquo;t</h2>
      <div className="proves-grid">
        <div className="proves">
          <strong>It proves</strong>
          <ul>
            <li>Each document existed in exactly this form no later than the time shown.</li>
            <li>Whether that time was before the milestone it is listed against.</li>
            <li>Any version that replaced it was recorded, when, and with what reason.</li>
          </ul>
        </div>
        <div className="limits">
          <strong>It doesn&rsquo;t prove</strong>
          <ul>
            <li>
              <strong>That the milestone dates are true.</strong> They are the sponsor&rsquo;s own statement,
              and the certificate labels them that way.
            </li>
            <li>Anything about the trial&rsquo;s results, the quality of its analysis, or whether the plan was followed.</li>
            <li>Who wrote each document, except where a named partner has attested it.</li>
          </ul>
        </div>
      </div>

      <h2>Questions</h2>
      <div className="faq">
        <details>
          <summary>Do you see or store our documents?</summary>
          <p>
            No. The fingerprint is calculated in your browser, and only the fingerprint is sent. A fingerprint
            can&rsquo;t be turned back into the document. To check a certificate, a verifier needs the
            documents from you.
          </p>
        </details>
        <details>
          <summary>What if Graticus disappears?</summary>
          <p>
            The certificates still check out. Certificate Check can be saved and opened from any computer, and
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
          <summary>How do I start?</summary>
          <p>
            Sponsors sign in through the Graticus Platform. Trial partners join by invitation from a sponsor.
            To ask about access, write to <a href="mailto:hello@graticus.com">hello@graticus.com</a>.
          </p>
        </details>
      </div>
    </SubPage>
  );
}
