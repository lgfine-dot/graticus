/*
 * 410 Gone for the old addresses left over from the domain's previous owner.
 *
 * Bots keep requesting URLs such as /ProductView.asp, /news/xw1/127.html and /zaozhi/ that never
 * existed on this site. Everything unknown already gets a plain 404 (src/app/not-found.tsx), but
 * these known patterns get 410 Gone, which tells search engines and crawlers to stop asking.
 *
 * The response is a tiny static page with a link home and NO analytics, so these hits are not
 * counted in Plausible. Nothing is stored or logged.
 *
 * Netlify's _redirects file cannot match "any path ending in .asp", which is why this is a
 * function rather than a redirect rule. None of these paths is a real page on graticus.com.
 */

const BODY = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Page not found — Graticus</title></head>
<body style="font-family:system-ui,sans-serif;text-align:center;padding:4rem 1rem">
<h1 style="font-weight:400">Page not found</h1>
<p>This address is no longer in use.</p>
<p><a href="/">Go to the Graticus home page &rarr;</a></p>
</body></html>`;

export default async () =>
  new Response(BODY, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });

export const config = {
  path: [
    "/*.asp",
    "/*.ASP",
    "/*.aspx",
    "/news",
    "/news/*",
    "/zgf",
    "/zgf/*",
    "/zaozhi",
    "/zaozhi/*",
    "/ynjkgf",
    "/ynjkgf/*",
    "/Filler-masterbatch",
    "/Filler-masterbatch/*",
    "/filler-masterbatch",
    "/filler-masterbatch/*",
    "/about/honor",
    "/about/honor/*",
  ],
};
