# Graticus

Marketing site for Graticus — a boutique life-sciences advisory.

Built with Next.js 14 (App Router, static export) and vanilla CSS with OKLCH design tokens. Designed for Netlify deployment.

## Develop

```
npm install
npm run dev
```

Opens on http://localhost:3000.

## Build

```
npm run build
```

Outputs a static site to `out/`.

## Deploy (Netlify)

1. Push this repository to GitHub.
2. Connect the repo to Netlify (New site from Git → choose this repo).
3. Netlify will pick up `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Point `graticus.com` DNS at the Netlify deployment.

## Contact form

The form posts to a **Netlify Function** (`netlify/functions/contact.mts`) which
sends the enquiry through **Resend**. The function runs on Netlify's side, so
the API key never reaches the browser and `output: "export"` stays as it is —
an earlier note here said Resend meant giving up the static export, which is
not the case.

Reply-to is set to the enquirer, so answering an enquiry is a plain reply.

### Setup (three environment variables)

Set these in **Netlify → Site configuration → Environment variables**. Never in
this repo — it is public. For local testing, copy `.env.example` to `.env`
(gitignored) and run `netlify dev` rather than `npm run dev`; `next dev` alone
does not serve functions, and the form will correctly report a failure.

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | Create at resend.com/api-keys with **Sending access** only. |
| `CONTACT_TO` | Optional. Where enquiries land. Defaults to `lawrence@agcp.pt`. |
| `CONTACT_FROM` | Optional. Must be on a domain verified at resend.com/domains — see below. |

### Where enquiries land

Enquiries go to `lawrence@agcp.pt` by default — a mailbox known to be read. The
site displays `hello@graticus.com`, but a send to a mailbox that does not exist
is reported as a success by Resend and the enquiry vanishes silently. Set
`CONTACT_TO` to `hello@graticus.com` once that address is confirmed to receive
mail. A recipient domain needs no verification in Resend; only the sender does.

### The From address

Resend will only send from a **verified domain**. The account has
`agcptech.com` verified; `graticus.com` is not added at all. So the function
defaults to `Graticus Site <graticus@agcptech.com>` — no DNS work, and the form
works the moment `RESEND_API_KEY` is set. `CONTACT_FROM` can be left unset.

Nobody outside sees that address. It is the From line on a notification to
yourself, and every message sets reply-to to the enquirer, so replying goes to
them and not to agcptech.com.

**Before launch:** add `graticus.com` at resend.com/domains, publish the DKIM
and SPF records it gives you, then set `CONTACT_FROM` to
`Graticus <hello@graticus.com>` in the Netlify environment. No code change.

### Failure behaviour

A failed send never looks like a successful one. If Resend rejects the message
(unverified From domain, revoked key) or the network fails, the visitor is shown
"That did not send. Please email hello@graticus.com." and their text is left in
the form. The specific reason goes to the Netlify function log, not the browser.

### Spam

A hidden honeypot field (`company_website`) is positioned off-screen and kept
out of the tab order. A submission that fills it in gets a cheerful `200` and no
email is sent.

## Design handoff

The source design reference is in `../graticus-extract/design_handoff_graticus/`:
- `Graticus Landing.html` — HTML/CSS reference for the landing page
- `Graticus Logo.html` — 8-direction logo exploration
- `README.md` — full design system spec (tokens, typography, spacing)
