/*
 * Every price Graticus publishes, in one place.
 *
 * The page markup never contains a number. It references these by id, so
 * changing a price is one line here rather than a search for every place the
 * figure appears — and the ids match the pricing table in the copy deck (P1–P3
 * Protocol Generator, T1–T6 Training, A1–A4 Advisory) so the two can be checked
 * against each other without translation.
 *
 * These are working numbers, not final ones. They have not yet been tested
 * against what a small-pharma buyer expects to pay.
 *
 * Two rules the page depends on:
 *
 *  - No hedging. "Indicative pricing" or "subject to change" reads worse than
 *    publishing nothing, so a number either appears plainly or is `quoted` and
 *    says so.
 *  - T6, the academic classroom rate, is deliberately NOT rendered on the main
 *    page. It lives here so the number has one home, but it belongs behind its
 *    own URL for education buyers. A corporate buyer who finds the classroom
 *    price stops paying the corporate one.
 */

export type PriceLine = {
  /** Matches the row id in the copy deck's pricing table. */
  id: string;
  /** The thing being bought. Rendered before the em dash. */
  label: string;
  /** The figure, exactly as it should read. Rendered after the em dash. */
  price: string;
  /** What the figure buys. Optional — some lines need no gloss. */
  body?: string;
};

export const prices = {
  // ---- Protocol Generator -------------------------------------------------
  P1: {
    id: "P1",
    label: "Single brief",
    price: "$3,500",
    body: "One compound, the complete document and register. Credited in full against a subscription if you continue.",
  },
  P2: {
    id: "P2",
    label: "Program access",
    price: "from $1,750/month",
    body: "Billed annually. Dedicated instance, up to 24 briefs a year, project-plan conversion included.",
  },
  P3: {
    id: "P3",
    label: "Full dashboard",
    price: "from $3,500/month",
    body: "Adds regulatory tracking, IP, vendor management and data room.",
  },

  // ---- Training -----------------------------------------------------------
  T1: {
    id: "T1",
    label: "Single simulation",
    price: "$450 per seat",
    body: "Try one before you commit a team.",
  },
  T2: {
    id: "T2",
    label: "Single track",
    price: "$1,800 per seat per year",
    body: "About twenty-four hours of content. Minimum 5 seats.",
  },
  T3: {
    id: "T3",
    label: "Full catalogue",
    price: "$2,750 per seat per year",
    body: "All thirteen. Minimum 5 seats.",
  },
  T4: {
    id: "T4",
    label: "Facilitated workshop",
    price: "$7,500",
    body: "One simulation, run as a session for up to fifteen people.",
  },
  T5: {
    id: "T5",
    label: "Tailored to your programme",
    price: "from $15,000",
    body: "Build fee, plus seats.",
  },
  /* Academic only. Not referenced by the main page — see the header note. */
  T6: {
    id: "T6",
    label: "Academic classroom licence",
    price: "$125 per student per term",
    body: "Minimum 20 students. Education buyers only, on its own page.",
  },

  // ---- Advisory -----------------------------------------------------------
  A1: {
    id: "A1",
    label: "Strategy sprint",
    price: "$12,500",
    body: "Three weeks, fixed fee, fixed scope. A licensing readiness assessment, a partner landscape, or a pathway review, delivered as a document you can act on.",
  },
  A2: {
    id: "A2",
    label: "Retained advisory",
    price: "from $7,500/month",
    body: "Three-month minimum. Ongoing counsel through a live process.",
  },
  A3: {
    id: "A3",
    label: "Fractional CBDO or interim leadership",
    price: "from $15,000/month",
  },
  A4: {
    id: "A4",
    label: "Transaction support",
    price: "quoted per deal",
  },
} satisfies Record<string, PriceLine>;

export type PriceId = keyof typeof prices;

/** Resolve the ids an offering lists into the lines the page renders. */
export function priceLines(ids: readonly PriceId[]): PriceLine[] {
  return ids.map((id) => prices[id]);
}
