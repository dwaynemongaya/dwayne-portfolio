# Progress

Last updated: 2026-11-27. Branch `main`, latest commit `81c0128 Remove hero caption text` (pushed, working tree clean).

## Status

The v2 portfolio is built, committed, and live at https://dwayne-melo-portfolio.vercel.app/ (Vercel project `dwayne-portfolio`, GitHub-connected, production branch `main`). The temporary v2 Vercel project was deleted.

## Completed

- Four skill sources installed: GSAP, Lenis, Emil Kowalski, Impeccable.
- Full redesign as a static site (HTML, CSS, vanilla JS modules) with vendored GSAP 3.13 + ScrollTrigger and Lenis 1.3.28. No build step.
- Roughly 3 s intro (name doors) that does not replay when navigating between sections.
- Layered hero: giant "Dwayne" / "Mongaya" (same size), cut-out portrait in front, interactive canvas burst behind it, scroll-driven horizon glow into About.
- Menu (About, Projects, Skills, Certification, Contact) available on the home screen, with active-section tracking.
- Sections: About (counters, timeline), Projects (JobPath, Expense, RowCheck as sticky stacked panels), Skills (scroll-velocity marquee), Certification (Linux, Python, CCNA), Contact (second burst, copy-email toast), image viewer dialog.
- Repo restructured so the site serves from `public/`; local folder is deployable by the user.
- Site icon replaced with the portrait photo (favicon.ico, 32 and 192 PNGs, apple-touch-icon).
- Hero caption lines removed (HTML, CSS rules, JS animation code).

## Key files

- `public/index.html`, `public/styles.css`
- `public/js/app.js` (motion, nav, sections), `public/js/burst.js` (canvas particle system), `public/boot.js` (html classes)
- `serve.mjs` (local dev server, port 4180, same CSP as production), `vercel.json` (outputDirectory `public`, security headers incl. strict CSP)
- `PRODUCT.md`, `README.md`

## Technical decisions

- Strict CSP: no inline scripts or style attributes; fonts (Bricolage Grotesque, Instrument Sans), scripts, and images are self-hosted.
- Portrait cut-out made with macOS Vision person segmentation, exported as `dwayne-cutout.webp`.
- Burst canvas pauses when off-screen and lowers quality adaptively.
- Honors `prefers-reduced-motion`.

## Known issues

- `dist/` and `output/` in the project root are stale and gitignored; safe to delete.
- The in-app test browser throttles `requestAnimationFrame`, so the intro can look stuck there; a 4.5 s JS failsafe ends it. Not seen on normal browsers.
- Pushes of large files may need `git -c http.postBuffer=524288000 push`.

## Next steps

- None requested. Wait for user direction.
