import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

// The end-user guide to the three free tools. Keep it in step with the tools' own pages: button
// names below are quoted exactly as they appear there.
export const metadata: Metadata = {
  title: "Free tools guide: Answer Check, Certificate Check, Document Compare — Graticus",
  description:
    "Step-by-step guide to Graticus's free tools: ask an AI a fair question and check its answer, confirm a sealed document is unchanged, and see every change between two versions of a document.",
};

const Ui = ({ children }: { children: React.ReactNode }) => <span className="ui">{children}</span>;

function Steps({ items }: { items: [React.ReactNode, React.ReactNode, boolean?][] }) {
  return (
    <ol className="g-steps">
      {items.map(([title, body, optional], i) => (
        <li key={i}>
          <b>
            {title}
            {optional ? <span className="opt">optional</span> : null}
          </b>
          <span>{body}</span>
        </li>
      ))}
    </ol>
  );
}

function Notes({ items }: { items: [string, React.ReactNode[], { tip?: boolean; id?: string }?][] }) {
  return (
    <div className="g-notes">
      {items.map(([title, lines, opt]) => (
        <div key={title} className={opt?.tip ? "g-note tip" : "g-note"} id={opt?.id}>
          <h4>{title}</h4>
          <ul>
            {lines.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function GuidePage() {
  return (
    <SubPage wide>
      <div className="label">Free tools · Guide</div>
      <h1>
        How to use Answer Check, Certificate Check <em>and Document Compare.</em>
      </h1>
      <p className="lede">
        Three free tools that answer three different questions about what you&rsquo;ve been sent. None of them
        needs an account. This guide shows each one step by step and explains what its results mean.
      </p>

      <div className="table-scroll">
        <table className="plain-table g-pick">
          <thead>
            <tr>
              <th>Your question</th>
              <th>Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                I want to ask an AI chatbot something. How do I ask fairly, and are the numbers and quotes in its
                answer really in its sources?
              </td>
              <td>
                <a href="#check">Answer Check</a>
                <br />
                <span className="note">check.graticus.com</span>
              </td>
            </tr>
            <tr>
              <td>
                I was sent a document with a Graticus certificate. Is it exactly the file that was sealed, and when
                was it sealed?
              </td>
              <td>
                <a href="#verify">Certificate Check</a>
                <br />
                <span className="note">verify.graticus.com</span>
              </td>
            </tr>
            <tr>
              <td>I have two versions of a document. What changed between them?</td>
              <td>
                <a href="#compare">Document Compare</a>
                <br />
                <span className="note">compare.graticus.com</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ANSWER CHECK */}
      <section className="g-tool" id="check">
        <h2>
          <span className="g-num">Tool 1</span> Answer Check
        </h2>
        <p>
          Answer Check has two halves, and they matter equally. <strong>Before you ask</strong> helps you write a
          fair question, so the chatbot isn&rsquo;t steered toward the answer you expect. <strong>Check the
          answer</strong> opens each source the answer cites and shows which of its numbers and quotes are really
          there.
        </p>
        <p className="g-meta">
          <a href="https://check.graticus.com">check.graticus.com &rarr;</a>
          <span>No account</span>
          <span>Early version</span>
          <span>Runs on Graticus&rsquo;s server</span>
        </p>

        <div className="g-why">
          <h4>Why the question matters as much as the answer</h4>
          <p>
            Chatbots tend to agree with the person asking. Ask &ldquo;Why is drug X the best treatment?&rdquo; and
            you will usually get a confident case for drug X, with real sources. Every figure in that answer can
            pass the check and the answer can still be one-sided, because the slant came from the question. The
            check confirms that the figures are in the sources. Only a fair question gets you a fair choice of
            figures in the first place.
          </p>
        </div>

        <h3>
          <span className="g-num">Part 1</span> Before you ask
        </h3>
        <div className="g-cols">
          <Steps
            items={[
              [
                "Write the question you plan to ask",
                <>
                  On the <Ui>1 · Before you ask</Ui> tab, type your question as you would put it to the chatbot,
                  and select <Ui>Review my question</Ui>. Graticus doesn&rsquo;t save what you type. See{" "}
                  <a href="#check-privacy">Where your text goes</a>.
                </>,
              ],
              [
                "See what steers the answer",
                <>
                  The review flags wording that pushes the answer one way: <em>Says what you believe</em>,{" "}
                  <em>Asks the AI to agree</em>, <em>Assumes the answer</em>, <em>Asks for a winner</em>,{" "}
                  <em>Asks for one side</em>, <em>Rules out &ldquo;it depends&rdquo;</em>, <em>Strong wording</em>{" "}
                  and <em>Treats it as settled</em>. If nothing does, it says so.
                </>,
              ],
              [
                "Read the fairer version",
                "It suggests a fairer way to ask and lists what it changed and why. The flags come from fixed rules. The rewording is written by AI, so read it and make sure it still asks what you want to know.",
              ],
              [
                "Ask the chatbot",
                <>
                  Select <Ui>Copy this question</Ui>, paste it into your chatbot, and ask it to cite a source for
                  each figure. Then bring the answer back for Part 2.
                </>,
              ],
            ]}
          />
          <div className="g-sample" aria-label="Example question review">
            <span className="cap">Example question review</span>
            <div className="g-card">
              <span className="sub">Your question</span>Why is drug X clearly the best treatment for psoriasis?
            </div>
            <div className="g-flags">
              <span className="chip warn">Assumes the answer</span>
              <span className="chip warn">Asks for a winner</span>
              <span className="chip warn">Strong wording</span>
            </div>
            <div className="g-card">
              <span className="v ok">A fairer way to ask</span>What are the main treatment options for psoriasis, and
              what does the evidence show about the benefits and risks of each, including drug X?
            </div>
          </div>
        </div>

        <h3>
          <span className="g-num">Part 2</span> Check the answer
        </h3>
        <div className="g-cols">
          <Steps
            items={[
              [
                "Paste the chatbot's answer",
                <>
                  On the <Ui>2 · Check the answer</Ui> tab, paste the full answer, including its links or
                  references, and select <Ui>Check this answer</Ui>. Answer Check can only check sentences that cite
                  a source.
                </>,
              ],
              [
                "Read the results",
                "Each claim gets one of four labels (explained below). For anything not marked ✓, read the passage it shows from the source and decide for yourself.",
              ],
              [
                "Seal the result",
                <>
                  Select <Ui>Get a sealed receipt</Ui> to add an outside timestamp. You get two files,{" "}
                  <code>answer-check-….json</code> and <code>answer-check-….proof.json</code>. Keep both. Anyone can
                  later use Certificate Check to confirm the result hasn&rsquo;t changed since you sealed it.
                </>,
                true,
              ],
            ]}
          />
          <div className="g-sample" aria-label="Example results">
            <span className="cap">Example results</span>
            <div className="g-card">
              <span className="v ok">✓ In its source</span>Placebo response in the trial was 31%.
            </div>
            <div className="g-card">
              <span className="v bad">✕ Not found as written</span>The drug cut relapse by half.
              <span className="sub">What the source says nearby: &ldquo;…relapse fell from 42% to 23%…&rdquo;</span>
            </div>
            <div className="g-card">
              <span className="v none">? Couldn&rsquo;t check</span>Approved in 14 countries.
              <span className="sub">The cited page could not be read.</span>
            </div>
            <div className="g-card">
              <span className="v none">– No number or quote to check</span>Most doctors consider it safe.
            </div>
          </div>
        </div>

        <h3>What the labels mean</h3>
        <dl className="g-key">
          <dt>
            <span className="chip ok">✓ In its source</span>
          </dt>
          <dd>
            The number or quoted words appear in the source the answer cites. In an October 2026 test, planned and
            sealed in advance so it couldn&rsquo;t be adjusted afterward, people checked results from 120 answers by
            Claude, ChatGPT and Perplexity without seeing the tool&rsquo;s verdict. Of 119 figures marked ✓, 115 (97%)
            really were in the source.
          </dd>
          <dt>
            <span className="chip bad">✕ Not found as written</span>
          </dt>
          <dd>
            The figure isn&rsquo;t in the source written that way. It may still be there in other words, in a
            table, or rounded. In the same October 2026 test, 74 of 89 figures marked ✕ were in fact in the source,
            written differently. <strong>In practice, ✕ usually means the figure is there in a different form, so it
            marks where to look rather than an error.</strong> The tool has been improved since that test, but it
            hasn&rsquo;t been re-tested yet. <a href="/answer-check/results">See the test results</a>.
          </dd>
          <dt>
            <span className="chip none">? Couldn&rsquo;t check</span>
          </dt>
          <dd>The source couldn&rsquo;t be opened or read. Nothing was checked, and this is never counted as fine.</dd>
          <dt>
            <span className="chip none">– No number or quote</span>
          </dt>
          <dd>The sentence makes no specific claim that can be matched against a source.</dd>
        </dl>

        <Notes
          items={[
            [
              "What it doesn't do",
              [
                "It doesn't judge whether advice is right for you.",
                "It doesn't judge whether the source itself is correct.",
                "It doesn't check sentences that cite no source.",
              ],
            ],
            [
              "Where your text goes",
              [
                "Unlike the other two tools, Answer Check runs on Graticus's server, because it has to open the sources.",
                <>
                  Your question in Part 1 is sent to Graticus and, for the fairer rewording, to Anthropic&rsquo;s AI,
                  Claude. Graticus doesn&rsquo;t store it. How Anthropic handles it is set out in Anthropic&rsquo;s{" "}
                  <a href="https://www.anthropic.com/legal/commercial-terms">commercial terms</a> and{" "}
                  <a href="https://www.anthropic.com/legal/privacy">privacy policy</a>.
                </>,
                "The answer you paste in Part 2 is sent to Graticus, which opens each cited link. No AI reads it. The result is held in memory for up to two hours so you can seal it, then discarded.",
                "The page counts visits with Plausible, which uses no cookies.",
                "Don't paste anything you wouldn't send to a website, such as personal health details.",
              ],
              { id: "check-privacy" },
            ],
            [
              "Tips",
              [
                "Don't skip Part 1, even when you think your question is neutral. Most steering is unintended.",
                "Ask the chatbot to cite a source for each number. More citations mean more claims can be checked.",
                "Treat ✕ as “go and look”, not as “false”.",
              ],
              { tip: true },
            ],
          ]}
        />
      </section>

      {/* CERTIFICATE CHECK */}
      <section className="g-tool" id="verify">
        <h2>
          <span className="g-num">Tool 2</span> Certificate Check
        </h2>
        <p>
          Confirms that a document sealed with Graticus is exactly the one that was sealed, and when it was sealed.
          It works only with Graticus certificates, not with other signatures such as DocuSign. It covers trial
          protocols, analysis plans, development briefs and Answer Check receipts. The check runs on your own
          computer, and your documents are never uploaded. <a href="/certificate">What is a Graticus certificate?</a>
        </p>
        <p className="g-meta">
          <a href="https://verify.graticus.com">verify.graticus.com &rarr;</a>
          <span>Nothing uploaded</span>
          <span>Can run offline (Amber at best)</span>
          <span>Two independent time proofs</span>
        </p>

        <div className="g-cols">
          <Steps
            items={[
              [
                "Get two things from the sender",
                <>
                  The Graticus certificate or proof file, which ends in <code>.json</code>, and the documents
                  themselves, exactly as you received them.
                </>,
              ],
              [
                "Open the page and drop everything in",
                "Drag the certificate and all the documents into the box together, or select them from your computer. For an Answer Check receipt, drop in both files it gave you.",
              ],
              [
                "Read the color",
                <>
                  Each document gets Green, Amber or Red, with the sealed time and the reason. To check a different
                  set, select <Ui>Start again</Ui>.
                </>,
              ],
            ]}
          />
          <div className="g-sample" aria-label="Example results">
            <span className="cap">Example results</span>
            <div className="g-verdict green">
              Green: unchanged
              <small>Protocol_v3.pdf is unchanged since 14 Oct 2026, 09:12 UTC. Both proofs of that time check out.</small>
            </div>
            <div className="g-verdict amber">
              Amber: unchanged, Bitcoin proof pending
              <small>The document and its signed time are valid. The Bitcoin proof is still being confirmed. Try again later.</small>
            </div>
            <div className="g-verdict red">
              Red: do not rely on it
              <small>SAP_v2.docx does not match the certificate. The file has been changed.</small>
            </div>
          </div>
        </div>

        <h3>What the colors mean</h3>
        <dl className="g-key">
          <dt>
            <span className="chip ok">Green</span>
          </dt>
          <dd>
            The document is unchanged since the time shown, and both independent proofs of that time check out: a
            timestamp signed by Sectigo, an EU-qualified timestamp authority under the eIDAS regulation, and a
            record on the public Bitcoin blockchain.
          </dd>
          <dt>
            <span className="chip warn">Amber</span>
          </dt>
          <dd>
            The document is unchanged and its signed time is valid. The Bitcoin proof is still pending, which is
            normal for the first few hours after sealing, or it couldn&rsquo;t be reached. Check again later.
          </dd>
          <dt>
            <span className="chip bad">Red</span>
          </dt>
          <dd>
            Do not rely on it. The document has been changed, isn&rsquo;t on the certificate, or a proof failed. The
            page says which.
          </dd>
        </dl>

        <Notes
          items={[
            [
              "Avoid a false Red",
              [
                "Use the file exactly as you received it. Opening a document and saving it again, even with no edits, can change the file and turn the result Red.",
                "Don't rename or convert it, for example by printing to PDF.",
              ],
              { tip: true },
            ],
            [
              "What it doesn't do",
              [
                "It proves a file is unchanged and when it was sealed. It doesn't judge whether the content is correct.",
                <>
                  It doesn&rsquo;t show <em>what</em> changed. For that, see{" "}
                  <a href="#together">Using them together</a>.
                </>,
              ],
            ],
            [
              "Privacy",
              [
                "Once loaded, the page's only network request is to a public Bitcoin block explorer, to read the Bitcoin proof. It sends no documents, and it loads no fonts or analytics from elsewhere. Under Advanced you can choose another explorer or your own node.",
                "You can save the page to your computer and run it from there, with no connection to Graticus. With no internet connection at all, it can't read the Bitcoin proof, so the best result is Amber.",
              ],
            ],
          ]}
        />
      </section>

      {/* DOCUMENT COMPARE */}
      <section className="g-tool" id="compare">
        <h2>
          <span className="g-num">Tool 3</span> Document Compare
        </h2>
        <p>
          Compares two versions of a Word or PDF document and shows every change: words, paragraphs and table
          cells, including table rows and columns that were added or deleted. The comparison runs in your browser,
          and nothing is uploaded.
        </p>
        <p className="g-meta">
          <a href="https://compare.graticus.com">compare.graticus.com &rarr;</a>
          <span>Word (.docx) and PDF</span>
          <span>Tables cell by cell</span>
          <span>Nothing uploaded</span>
        </p>

        <div className="g-cols">
          <Steps
            items={[
              ["Add the original", "Drop the earlier version into box 1, or select it."],
              [
                "Add the revised version",
                "Drop the later version into box 2. You can mix formats, for example a Word original and a PDF revision.",
              ],
              [
                "Select Compare",
                "The headline gives the number of changes, followed by a summary such as “3 paragraphs edited” or “2 tables changed (4 cells edited, 1 row added)”.",
              ],
              [
                "Step through the changes",
                <>
                  Use <Ui>◀ Previous</Ui> and <Ui>Next ▶</Ui>, or press <kbd>n</kbd> and <kbd>p</kbd>.{" "}
                  <Ui>Show changes only</Ui> is on at first, which hides long stretches of unchanged text. Turn it
                  off to read the whole document.
                </>,
              ],
              [
                "Keep a record",
                <>
                  <Ui>Print</Ui> gives a clean copy with the colors kept, which you can also save as a PDF.{" "}
                  <Ui>Compare other files</Ui> starts over.
                </>,
                true,
              ],
            ]}
          />
          <div className="g-sample" aria-label="Example results">
            <span className="cap">Example results</span>
            <div className="g-card chg">
              Results for <del>three</del>
              <ins>four</ins> development batches.
            </div>
            <div className="table-scroll">
              <table className="g-mini">
                <thead>
                  <tr>
                    <th>Work package</th>
                    <th>2026</th>
                    <th>2027</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="gap" colSpan={3}>
                      3 unchanged rows
                    </td>
                  </tr>
                  <tr className="rins">
                    <td>
                      <ins>Regulatory writing</ins>
                    </td>
                    <td>
                      <ins>3,000</ins>
                    </td>
                    <td>
                      <ins>8,000</ins>
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="cm">
                      <del>47,000</del>
                      <ins>50,000</ins>
                    </td>
                    <td className="cm">
                      <del>34,000</del>
                      <ins>42,000</ins>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-scroll">
              <table className="g-mini">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="rdel">
                    <td>
                      <del>1</del>
                    </td>
                    <td>
                      <del>Complete stability pull</del>
                    </td>
                  </tr>
                  <tr>
                    <td className="cm">
                      <del>2</del>
                      <ins>1</ins>
                    </td>
                    <td>Validate impurity method</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h3>How changes are shown</h3>
        <dl className="g-key">
          <dt>
            <ins>Added text</ins>
          </dt>
          <dd>Green and underlined.</dd>
          <dt>
            <del>Deleted text</del>
          </dt>
          <dd>Red and struck through.</dd>
          <dt>Yellow bar</dt>
          <dd>A paragraph or table row that was edited.</dd>
          <dt>Green or red row</dt>
          <dd>
            A whole table row that was added or deleted. An added or deleted column is labeled &ldquo;Column
            added&rdquo; or &ldquo;Column deleted&rdquo; above it.
          </dd>
          <dt>Moved here</dt>
          <dd>A paragraph that was moved but not changed. A link takes you to where it was before.</dd>
        </dl>
        <p className="note">Changes are shown in the order of the revised document.</p>

        <Notes
          items={[
            [
              "What is compared",
              [
                "Body text and list numbers, word by word.",
                "Tables, cell by cell, in Word files and in PDFs saved from Word.",
                "Footnotes and endnotes in Word files.",
                "Tracked changes, compared as if they had been accepted.",
              ],
            ],
            [
              "What isn't compared",
              [
                "Page headers and footers, text boxes and images.",
                "Formatting such as bold, fonts or colors.",
                "Scanned PDFs, which are pictures of pages and contain no text.",
                "Old .doc files. Open them in Word and save as .docx first.",
              ],
            ],
            [
              "For the best results",
              [
                "Compare Word files when you have them.",
                "For PDFs, use ones saved from Word with “Save as PDF”. If a PDF lacks the structure needed to read its tables, the page will tell you and compare it line by line instead.",
              ],
              { tip: true },
            ],
          ]}
        />
      </section>

      <section className="g-together" id="together">
        <h2>Certificate Check says Red. What changed?</h2>
        <p>
          Certificate Check proves whether a document changed, but not what changed. Document Compare shows what
          changed, but it isn&rsquo;t proof. Used together:
        </p>
        <ol>
          <li>Run Certificate Check on the document you received. If it&rsquo;s Red, ask the sender for the version that was sealed.</li>
          <li>Run Certificate Check on that version. It should come back Green.</li>
          <li>
            Open Document Compare with the Green version as the original and the one you received as the revised
            version. You&rsquo;ll see every edit made after sealing.
          </li>
        </ol>
      </section>
    </SubPage>
  );
}
