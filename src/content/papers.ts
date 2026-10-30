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
    title: "Managing Stability in an Age of Constant Change",
    // PLACEHOLDER: replace with the real two-or-three-sentence summary.
    summary:
      "[Placeholder summary: two or three sentences on what the paper argues and who it is for. Replace before publishing.]",
    // PLACEHOLDER: set to the real publication date.
    date: "2026-10-30",
    author: "Lawrence Fine",
    // PLACEHOLDER: the file in public/papers/ is a one-page stand-in. Replace it with the real PDF
    // under the same name, or change this name to match the new file.
    pdf: "managing-stability-in-an-age-of-constant-change.pdf",
  },
];
