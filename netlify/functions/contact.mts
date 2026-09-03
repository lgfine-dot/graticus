/*
 * Contact form → email, via Resend.
 *
 * The site is a static export, so there is no Next.js server to host an API
 * route. A Netlify Function is the piece that can hold a secret: it runs on
 * Netlify's side, the browser never sees RESEND_API_KEY, and `output: "export"`
 * stays exactly as it is. (The README used to say Resend meant giving up the
 * static export. It doesn't.)
 *
 * Configuration — all set in the Netlify UI, never in this repo:
 *
 *   RESEND_API_KEY   required. Create at resend.com/api-keys with "Sending
 *                    access" only; this function never reads or lists anything.
 *   CONTACT_TO       where enquiries land. Optional — defaults to DELIVER_TO
 *                    below. A recipient domain needs no verification in
 *                    Resend; only the sender does.
 *                    Set it to route enquiries somewhere else temporarily,
 *                    e.g. while the Graticus mailbox is being reorganised.
 *   CONTACT_FROM     the From address. Optional — defaults to DEFAULT_FROM
 *                    below. Must be on a domain verified in Resend.
 *
 * Every reply-to is the enquirer, so answering is a plain reply.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/*
 * graticus.com was verified in Resend on 2026-09-03, so mail can be sent from
 * the brand's own address. Before that the default was an agcptech.com sender
 * as a stopgap; that is no longer needed and would now look like mail from a
 * different company.
 *
 * Sending requires a domain verified at resend.com/domains. If this address
 * ever stops working, check the domain's status there first.
 */
const DEFAULT_FROM = "Graticus <hello@graticus.com>";

/*
 * Where enquiries land. This is the address the site displays, which is how it
 * should be — but note that Resend reports a send to a non-existent mailbox as
 * a success, so a broken mailbox loses enquiries silently. hello@graticus.com
 * was confirmed to send and receive through Proton on 2026-09-03; re-test it
 * if the MX records for graticus.com ever change.
 */
const DELIVER_TO = "hello@graticus.com";

/* Generous enough for a real enquiry, tight enough that the function is not a
   relay for someone pasting a novel into the textarea. */
const LIMITS = {
  name: 200,
  email: 320, // the practical maximum length of an email address
  org: 200,
  area: 100,
  msg: 5000,
} as const;

type Field = keyof typeof LIMITS;

const AREAS = [
  "Protocol Generator",
  "Training",
  "The full dashboard",
  "Advisory",
  "A combination of the above",
  "Not sure yet",
];

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/* Deliberately loose. Address validation by regex is a losing game, and the
   cost of rejecting a real enquiry is far higher than the cost of letting a
   malformed one through to a human. */
function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clean(value: FormDataEntryValue | null, field: Field) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, LIMITS[field]);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    /* Loud in the function log, vague to the browser. A visitor does not need
       to know which environment variable is missing. */
    console.error("RESEND_API_KEY is not set — cannot send contact enquiries.");
    return json({ error: "unconfigured" }, 500);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "Could not read the submission." }, 400);
  }

  /* Honeypot. A field no human sees and no human fills in; bots fill in
     everything. Answer 200 so the bot believes it succeeded and does not
     come back to try a different shape. */
  if (clean(form.get("company_website"), "org")) {
    return json({ ok: true }, 200);
  }

  const name = clean(form.get("name"), "name");
  const email = clean(form.get("email"), "email");
  const org = clean(form.get("org"), "org");
  const areaRaw = clean(form.get("area"), "area");
  const msg = clean(form.get("msg"), "msg");

  if (!name || !email) {
    return json({ error: "Please include your name and email." }, 400);
  }
  if (!looksLikeEmail(email)) {
    return json({ error: "That email address does not look right." }, 400);
  }

  /* Only the areas the form actually offers reach the subject line, so the
     subject cannot be set to arbitrary text by a crafted POST. */
  const area = AREAS.includes(areaRaw) ? areaRaw : "Not specified";

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Organization", org || "—"],
    ["Area of interest", area],
    ["What they are working on", msg || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(
        k,
      )}</td><td style="padding:4px 0">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("\n")}
</table>`;

  let res: Response;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_TO || DELIVER_TO],
        reply_to: email,
        subject: `${area} — ${name}${org ? ` (${org})` : ""}`,
        text,
        html,
      }),
    });
  } catch (err) {
    console.error("Resend request failed", err);
    return json({ error: "send-failed" }, 502);
  }

  if (!res.ok) {
    /* The body carries Resend's own reason — an unverified From domain, a
       revoked key. It goes to the function log, not to the visitor. */
    console.error("Resend rejected the message", res.status, await res.text());
    return json({ error: "send-failed" }, 502);
  }

  return json({ ok: true }, 200);
};
