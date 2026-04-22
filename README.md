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

`src/components/ContactForm.tsx` currently stubs the submit handler with a 600ms delay. Before launch, wire it to either:

- **Formspree** (zero backend): uncomment the block in `onSubmit` and set `endpoint` to your Formspree form URL.
- **Resend** (custom API route): requires switching the Next config away from `output: "export"` (static export can't host an API route), or hosting the API separately.

## Design handoff

The source design reference is in `../graticus-extract/design_handoff_graticus/`:
- `Graticus Landing.html` — HTML/CSS reference for the landing page
- `Graticus Logo.html` — 8-direction logo exploration
- `README.md` — full design system spec (tokens, typography, spacing)
