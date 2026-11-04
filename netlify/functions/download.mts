/*
 * White-paper download counter.
 *
 * The "Download PDF" button on /insights points at /download/<file>.pdf. This
 * function notes that one download happened and sends the browser straight on
 * to /papers/<file>.pdf, which is the same static file as before.
 *
 * WHAT IS RECORDED: the paper's file name and the date (UTC, day only). Nothing
 * else. No time of day, no IP address, no cookie, no browser details, no
 * referrer. Each download is stored as one empty entry named
 *
 *     <YYYY-MM-DD>/<file>.pdf/<random id>
 *
 * The random id exists only so two downloads on the same day do not overwrite
 * each other (Netlify Blobs has no "add one" operation). It is generated fresh
 * every time and is not linked to anything about the visitor.
 *
 * The User-Agent header is looked at, in memory, only to skip obvious robots
 * (search crawlers, link previews, command-line tools). It is never stored.
 *
 * The counter must never get in the way of a download: if storage fails, the
 * visitor is still redirected to the file.
 *
 * The numbers are read by download-stats.mts.
 */

import { getStore } from "@netlify/blobs";
import { papers } from "../../src/content/papers";
import { STORE_NAME } from "../lib/downloads";

// The one field of Netlify's Context this needs.
type Context = { params?: Record<string, string> };

const ROBOT =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|curl|wget|python|httpclient|java\/|go-http|headless|lighthouse|pingdom|uptime|monitor/i;

export default async (req: Request, context: Context) => {
  const file = context.params?.file ?? "";
  const paper = papers.find((p) => p.pdf === file);

  // Only papers on the Insights list exist. Anything else is a plain 404, and
  // nothing is written, so the counts cannot be filled with made-up names.
  if (!paper) {
    return new Response("Not found", { status: 404, headers: { "cache-control": "no-store" } });
  }

  const userAgent = req.headers.get("user-agent") ?? "";
  const countable = req.method === "GET" && userAgent !== "" && !ROBOT.test(userAgent);

  if (countable) {
    const day = new Date().toISOString().slice(0, 10);
    try {
      await getStore(STORE_NAME).set(`${day}/${paper.pdf}/${crypto.randomUUID()}`, "");
    } catch (err) {
      console.error("[download] could not record a download:", (err as Error).message);
    }
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: `/papers/${paper.pdf}`,
      // Never cache the redirect, or later downloads would skip the counter.
      "cache-control": "no-store",
    },
  });
};

export const config = {
  path: "/download/:file",
  method: ["GET", "HEAD"],
};
