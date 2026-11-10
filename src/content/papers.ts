/*
 * The papers listed on /insights, newest first. To add one:
 *   1. Put the PDF in public/papers/ (a short name with dashes, no spaces).
 *   2. Copy one entry below, paste it at the top of the list, and change the text.
 *      `pdf` is the file name you used in step 1.
 *   3. Add a comma after the closing } of each entry.
 * Dates are written year-month-day, e.g. "2026-10-30".
 */
export type Paper = {
  title: string;
  summary: string; // two or three sentences
  date: string; // publication date, YYYY-MM-DD
  author: string;
  pdf: string; // file name inside public/papers/
};

export const papers: Paper[] = [
  {
    title: "The Valley of Death",
    summary:
      "For every hundred inventions US universities record, fewer than three new products reach the market, and the 2025–2026 federal funding shock has turned that chronic gap into an acute one. This paper argues the Valley of Death is a structural failure, not only a funding one, and looks at what the global bridge-builders do differently. It makes the case that the biggest opening is for operators who bring tooling and training rather than capital alone, with reformulation of poorly soluble molecules as an undervalued front.",
    date: "2026-11-10",
    author: "Lawrence Fine",
    pdf: "the-valley-of-death.pdf",
  },
  {
    title: "Managing Stability in an Age of Constant Change",
    summary:
      "AI has made change constant, and the classic change models assume a stable \"after\" that no longer arrives. This paper argues that stability is now the scarce resource leaders must manage on purpose, drawing on pharmaceutical change control, hospitality and professional services. It offers a four-question framework (Anchors, Capacity, Timing and Value) and a one-page stability check to use before the next change.",
    date: "2026-10-30",
    author: "Lawrence Fine",
    pdf: "managing-stability-in-an-age-of-constant-change.pdf",
  },
];
