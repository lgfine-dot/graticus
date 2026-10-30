import type { Metadata } from "next";
import Graticule from "@/components/Graticule";
import results from "../../../../public/answer-check/round-1/results.json";
import corpus from "../../../../public/answer-check/round-1/corpus.canonical.json";
import draw from "../../../../public/answer-check/round-1/draw.json";

/*
 * Answer Check evaluation, round 1. The figures come from the sealed results file
 * itself (public/answer-check/round-1/results.json), not retyped, so the page cannot
 * drift from what was sealed. The plan promised publication whatever the results
 * showed; the failed measure is reported as prominently as the ones that passed.
 */
export const metadata: Metadata = {
  title: "Answer Check, measured: round 1 results — Graticus",
  description:
    "A pre-registered test of Answer Check against people's judgment: when it says a figure is in the source it is right about 97% of the time; its 'not in source' flags are wrong far more often than our mark allowed.",
};

const R = "/answer-check/round-1";
const pct = (x: number, d = 1) => `${(x * 100).toFixed(d)}%`;
const range = (ci: number[]) => `${pct(ci[0])} to ${pct(ci[1])}`;

const measures = [
  {
    id: "M1",
    primary: true,
    question: "When Answer Check says a figure is found in the source, how often is that wrong?",
    mark: "at most 5%",
    m: results.M1,
    detail: `${results.M1.k} of ${results.M1.n} items people could judge. 95% interval ${range(results.M1.ci95)}.`,
  },
  {
    id: "M2",
    question: "When it says a figure is not in the source, how often is the figure really there?",
    mark: "at most 15%",
    m: results.M2,
    detail: `${results.M2.k} of ${results.M2.n}. 95% interval ${range(results.M2.ci95)}.`,
  },
  {
    id: "M3",
    question: "When we change a correct figure on purpose, how often does it notice?",
    mark: "at least 95%",
    m: results.M3,
    detail: `${results.M3.k} of ${results.M3.n} altered figures caught.`,
  },
  {
    id: "M4",
    question: "Checked again on the same stored sources, does it give the identical result?",
    mark: "100%",
    m: results.M4,
    detail: `${results.M4.k} of ${results.M4.n} answers gave the same receipt fingerprint.`,
  },
];

// Per-assistant counts, worked out from the sealed corpus and draw so readers can see how
// much evidence each estimate rests on.
const itemById = new Map(corpus.items.map((i) => [i.id, i]));
const labelled = [...draw.found, ...draw.notFound];
const assistants = (
  [
    ["Claude", "claude"],
    ["ChatGPT", "chatgpt"],
    ["Perplexity", "perplexity"],
  ] as const
).map(([name, key]) => {
  const items = corpus.items.filter((i) => i.assistant === key);
  const judged = labelled.filter((id) => {
    const final = (results.labels as Record<string, { final: string | null }>)[id]?.final;
    return itemById.get(id)?.assistant === key && final && final !== "CANT_TELL";
  });
  return {
    name,
    answers: corpus.answers.filter((x) => x.assistant === key).length,
    answersWithFigures: new Set(items.map((i) => i.answerId)).size,
    judged: judged.length,
    notSupported: judged.filter(
      (id) => (results.labels as Record<string, { final: string | null }>)[id].final === "NOT_SUPPORTED",
    ).length,
    estimate: results.M7[key].estimatedUnsupportedShare,
    figures: results.M7[key].items,
  };
});

const files = [
  ["plan.canonical.json", "The plan, sealed 22 October before any answer existed", "plan.proof.json"],
  ["corpus.canonical.json", "The 120 answers, every item and the checker's verdicts, sealed before labelling", "corpus.proof.json"],
  ["results.canonical.json", "These results, sealed 28 October", "results.proof.json"],
  ["draw.json", "Which items were drawn, from which Bitcoin block, and the 100 altered figures", null],
  ["labels-first.json", "Every label from the first labeller", null],
  ["labels-second.json", "Every label from the second labeller", null],
  ["adjudication.json", "The agreed label for each disagreement", null],
] as const;

export default function AnswerCheckResults() {
  const a = results.agreement;
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
            <a href="https://check.graticus.com" className="nav-cta">
              Try Answer Check
            </a>
          </div>
        </div>
      </nav>

      <main className="report">
        <div className="wrap narrow">
          <div className="label">Answer Check · Evaluation round 1 · Results sealed 28 October 2026</div>
          <h1>
            Who checks the checker? <em>We measured it, and published what we found.</em>
          </h1>
          <p className="lede">
            Answer Check reads the sources an AI answer cites and shows which numbers and quotes are really in
            them. Before collecting a single answer we wrote down how we would test it and what would count as
            passing, and sealed that plan so it could not be changed afterwards. People then judged each figure
            against its source without seeing what Answer Check had said. Here is everything, including the
            measure it failed.
          </p>

          <h2>The results</h2>
          <div className="measures">
            {measures.map((x) => (
              <div key={x.id} className={`measure ${x.m.verdict === "met" ? "met" : "missed"}`}>
                <div className="m-head">
                  <span className="m-id">
                    {x.id}
                    {x.primary ? " · primary" : ""}
                  </span>
                  <span className="verdict">{x.m.verdict === "met" ? "Met" : "Not met"}</span>
                </div>
                <p className="m-q">{x.question}</p>
                <div className="m-figs">
                  <span className="big">{pct(x.m.share)}</span>
                  <span className="mk">mark: {x.mark}</span>
                </div>
                <p className="m-detail">{x.detail}</p>
              </div>
            ))}
          </div>

          <h2>What this means if you use it</h2>
          <ul className="plain">
            <li>
              <strong>A ✓ found in source is reliable.</strong> When Answer Check said a figure was in its
              source, people agreed about 97% of the time. This is the measure that matters most, because the
              harm the tool exists to prevent is telling you something is backed when it isn&rsquo;t. Read it
              with the interval beside it: with {results.M1.n} items, the true rate could be as high as{" "}
              {pct(results.M1.ci95[1])}. The plan judges on the measured figure.
            </li>
            <li>
              <strong>A ✕ not in source is too often wrong.</strong> In {results.M2.k} of {results.M2.n} cases
              the figure was in the source, written differently: in words, in a table, or in another phrasing
              Answer Check doesn&rsquo;t match. Until that changes, read a ✕ as &ldquo;couldn&rsquo;t
              confirm&rdquo;, and look at the nearest passages it shows you before concluding the AI made
              something up.
            </li>
            <li>
              <strong>It notices a changed figure.</strong> We altered {results.M3.n} correct figures (scaled up
              or down, or one digit changed) and checked them against the same sources. It flagged{" "}
              {results.M3.k}.
            </li>
            <li>
              <strong>It is repeatable.</strong> The check is code, not a model. Run again on the same stored
              sources, every one of the {results.M4.n} answers gave an identical result.
            </li>
          </ul>

          <h2>How it was done</h2>
          <ul className="plain">
            <li>
              <strong>The answers.</strong> 40 fixed questions on health, medicines, money, science and
              technology, each asked once of Claude, ChatGPT and Perplexity with web search on: 120 answers,{" "}
              {results.M5.failedCollections} failed. Each was checked as it arrived, and the text of every source
              it read was stored, so the check can be repeated on exactly what was compared.
            </li>
            <li>
              <strong>The sample.</strong> Items were drawn at random, using a Bitcoin block that did not exist
              until after the answers were sealed, so nobody could choose them: 120 that Answer Check marked
              found and all 105 it marked not found.
            </li>
            <li>
              <strong>The judges were people, not a model.</strong> For each item a labeller saw the claim, the
              figure and the stored source, and answered supported, not supported or can&rsquo;t tell. They did
              not see Answer Check&rsquo;s verdict or which assistant wrote the answer. Lawrence Fine labelled
              all 225. Cory Hill labelled {a.overlap} of them without seeing Lawrence&rsquo;s labels. Cory works
              with Graticus commercially, so he is not an outside reviewer; the labels from both are published
              below so anyone can re-judge them.
            </li>
            <li>
              <strong>Agreement.</strong> Before any discussion the two agreed on {a.agreedBeforeDiscussion} of{" "}
              {a.overlap} (Cohen&rsquo;s kappa {a.cohensKappa.toFixed(2)}). They settled the other{" "}
              {a.overlap - a.agreedBeforeDiscussion} together, looking at the source; both original labels are
              kept beside the agreed one.
            </li>
            <li>
              <strong>What wasn&rsquo;t judged.</strong> {results.M5.sourcesUnreadable} of{" "}
              {results.M5.sourcesUnreadable + results.M5.sourcesRead} cited sources could not be read (blocked,
              paywalled or gone), so their figures were &ldquo;couldn&rsquo;t check&rdquo; and not labelled.{" "}
              {results.M5.claimsNothingToCheck} cited claims had no number or quote to check. Labellers marked{" "}
              {results.M5.cantTell.length} items can&rsquo;t tell, each with a reason, and those are left out of
              the shares above. Labellers were asked to note any figure Answer Check failed to pick up; they noted{" "}
              {results.M6.length === 0 ? "none" : results.M6.length}.
            </li>
          </ul>

          <h2>A side finding about the assistants</h2>
          <p>
            This measures the assistants, not Answer Check. Weighted back to all the figures they cited, the
            estimated share people judged not supported by the cited source:
          </p>
          <div className="table-scroll">
          <table className="assist">
            <thead>
              <tr>
                <th>Assistant</th>
                <th>Answers</th>
                <th>Citing a checkable figure</th>
                <th>Figures cited</th>
                <th>Judged by people</th>
                <th>Not supported</th>
                <th>Estimate</th>
              </tr>
            </thead>
            <tbody>
              {assistants.map((v) => (
                <tr key={v.name}>
                  <td>{v.name}</td>
                  <td>{v.answers}</td>
                  <td>{v.answersWithFigures}</td>
                  <td>{v.figures}</td>
                  <td>{v.judged}</td>
                  <td>{v.notSupported}</td>
                  <td>{v.estimate === null ? "—" : pct(v.estimate, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <p className="note">
            Treat this with care. Each assistant answered the same 40 questions, but every Claude answer cited
            specific figures from its sources while only about half of the ChatGPT and Perplexity answers did,
            so their estimates rest on few judged items: Perplexity&rsquo;s on{" "}
            {assistants[2].judged}. The estimate weights the judged items back to all the figures each assistant
            cited. One run of 40 questions, one model version each, in October 2026.
          </p>

          <h2>Check it yourself</h2>
          <p>
            Each sealed file has a proof: a qualified timestamp from Sectigo and a Bitcoin anchor. Drop a{" "}
            <code>.canonical.json</code> file and its <code>.proof.json</code> into{" "}
            <a href="https://verify.graticus.com/verify.html">verify.graticus.com</a> to confirm it has not changed
            since it was sealed. The check runs on your own computer.
          </p>
          <ul className="files">
            {files.map(([f, what, proof]) => (
              <li key={f}>
                <a href={`${R}/${f}`} download>
                  {f}
                </a>
                {proof ? (
                  <>
                    {" "}
                    · <a href={`${R}/${proof}`} download>proof</a>
                  </>
                ) : null}
                <span>{what}</span>
              </li>
            ))}
          </ul>
          <p className="note">
            The stored source texts are not republished here because they belong to their publishers; each is
            identified by its fingerprint in the corpus file. Results fingerprint (SHA-256):{" "}
            <code className="hash">0dbb1c2faa3f604b1b84379c6fbf8f0788381b40dbb5cccf21d9a773bdcd6a89</code>
          </p>

          <h2>What happens next</h2>
          <p>
            Anything we change or analyse after seeing these results is published separately and marked as
            such, so it cannot be confused with what the sealed plan measured. The first change will be how a
            ✕ is worded, so it no longer suggests a figure is absent when it may only be phrased differently. A
            second round will measure that change the same way.
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
