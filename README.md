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
| `CONTACT_TO` | Optional. Where enquiries land. Defaults to `hello@graticus.com`. |
| `CONTACT_FROM` | Optional. Defaults to `Graticus <hello@graticus.com>`. Must be on a verified domain. |

### Where enquiries land

Enquiries go to `hello@graticus.com`, which sends via Resend and receives via
Proton (confirmed working 2026-09-03). Both defaults are in the function, so
neither `CONTACT_TO` nor `CONTACT_FROM` needs setting — they exist to override,
e.g. to reroute enquiries temporarily.

Worth knowing: Resend reports a send to a non-existent mailbox as a **success**,
so a broken recipient loses enquiries silently. If the MX records for
graticus.com ever change, re-test that the mailbox still receives.

The From address must be on a domain verified at resend.com/domains.
`graticus.com` is verified; `agcptech.com` also is, and was used as a stopgap
sender before graticus.com was added.

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
