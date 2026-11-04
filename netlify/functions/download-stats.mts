/*
 * Download counts for the white papers, for the report page on the Graticus
 * Platform (platform.graticus.com, Admin → Paper downloads, super admins only).
 *
 * Server-to-server only. The platform calls this with
 *
 *     Authorization: Bearer <DOWNLOAD_STATS_KEY>
 *
 * DOWNLOAD_STATS_KEY is set in the Netlify UI (and the same value on Railway as
 * GRATICUS_SITE_STATS_KEY), never in this repo, which is public. If it is not
 * set, the endpoint is closed.
 *
 * Returns only what download.mts records: per paper, per day, a count.
 */

import { createHash, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { papers } from "../../src/content/papers";
import { STORE_NAME } from "../lib/downloads";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const digest = (s: string) => createHash("sha256").update(s).digest();

function authorised(req: Request, key: string): boolean {
  const header = req.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  // Compare fixed-length digests so the check takes the same time either way.
  return given !== "" && timingSafeEqual(digest(given), digest(key));
}

export default async (req: Request) => {
  const key = process.env.DOWNLOAD_STATS_KEY ?? "";
  if (key.length < 32) return json({ error: "Not configured." }, 503);
  if (!authorised(req, key)) return json({ error: "Unauthorized." }, 401);

  const store = getStore({ name: STORE_NAME, consistency: "strong" });
  const { blobs } = await store.list();

  const counts = new Map<string, number>(); // "date|file" -> n
  for (const { key: k } of blobs) {
    const [date, file] = k.split("/");
    if (!date || !file) continue;
    const id = `${date}|${file}`;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  const titles = new Map(papers.map((p) => [p.pdf, p.title]));
  const days = [...counts.entries()]
    .map(([id, count]) => {
      const [date, file] = id.split("|");
      return { date, file, title: titles.get(file) ?? file, count };
    })
    .sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : a.date < b.date ? 1 : -1));

  // Every listed paper appears, including ones not yet downloaded; a paper
  // taken off the list keeps its history.
  const files = [...new Set([...papers.map((p) => p.pdf), ...days.map((d) => d.file)])];
  const totals = files.map((file) => ({
    file,
    title: titles.get(file) ?? file,
    count: days.filter((d) => d.file === file).reduce((n, d) => n + d.count, 0),
  }));

  return json({
    generatedAt: new Date().toISOString(),
    total: days.reduce((n, d) => n + d.count, 0),
    totals,
    days,
  });
};

export const config = {
  path: "/api/download-stats",
  method: ["GET"],
};
