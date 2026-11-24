# Dwayne Mongaya — portfolio

Static site: HTML, CSS, vanilla JS, with vendored GSAP (ScrollTrigger) and Lenis. No build step, no dependencies to install.

## Preview

```sh
node serve.mjs
```

Open http://localhost:4180. The server sends the same strict Content-Security-Policy as `vercel.json`.

## Deploy

`vercel.json` serves `public/` as-is (no build command). From this folder run `vercel` (preview) or `vercel --prod`.

## Files (all inside `public/`)

- `index.html`: all content (copied from the original portfolio's `src/content.mjs`; same facts and omissions).
- `styles.css`: design tokens, layout, responsive rules.
- `js/app.js`: intro doors, hero entrance, horizon glow, scroll reveals, nav, viewer.
- `js/burst.js`: interactive canvas explosion behind the portrait.
- `assets/`: portrait cut-out (`dwayne-cutout.webp`), project images, certificates, resume.
