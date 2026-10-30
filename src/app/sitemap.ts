import type { MetadataRoute } from "next";

// The sitemap robots.txt already points to, for Google Search Console. Every page of the static export is listed by
// hand: add a new page here when you add one. lastModified is the date the page's content last changed, not the
// build date, so Google can trust it.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://graticus.com/", lastModified: "2026-10-28" },
    { url: "https://graticus.com/answer-check/results", lastModified: "2026-10-28" },
    { url: "https://graticus.com/insights", lastModified: "2026-10-30" },
  ];
}
