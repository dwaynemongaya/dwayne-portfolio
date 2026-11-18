# Dwayne Mongaya — portfolio

A static internship portfolio built with HTML, CSS, JavaScript, and a dependency-free Node.js build script. Editable personal content lives in `src/content.mjs`.

## Local preview

Use Node.js 22 or newer. No dependency installation is required.

```sh
npm run dev
```

Open **http://localhost:5173**. The server restarts when imported content changes; refresh to see edits. CSS and browser JavaScript are served directly from `public/`.

To check and preview the production build:

```sh
npm run check
npm run build
npm run preview
```

Open **http://localhost:4173**. Stop a server with Ctrl+C. Set `PORT` to use another port.

## Views and interactions

The blue navigation links select **Home, About, Projects, Skills, Certifications, Contact**. Each view has a shareable hash URL, supports browser back/forward navigation, and updates the active link, page title, and heading focus. A small script chooses the initial view before body paint. Home is a compact viewport layout; content remains scrollable on unusually short displays or at increased text zoom so nothing is clipped.

- **Home:** brief resume-based introduction, resume download, Manila location, the decorative “THE INTERSECTION OF” monogram graphic, and a larger JobPath shortcut.
- **About:** background, FEU college education, and both resume-based experience entries. Senior high school and Dean's Lister recognition are omitted at Dwayne's request. No birthday is shown.
- **Projects:** concise JobPath overview and verified stack, with supplied code/site links. Selecting the project opens an accessible native dialog with detailed team and individual contributions. The blue **Best Thesis Award — Click To View** panel reveals the original award photo and exact supplied caption.
- **Skills:** four grouped toolkit cards with colored rectangular skill rows and a restrained hover glow. Programming is blue, Data Science green, development tools blue-gray, and AI tools warm sand. No proficiency scores or skill-row arrows are shown.
- **Certifications:** full-width document rows with category, title, issuer, description, and document metadata on the left, and a complete preview on the right. Rows stack on phones. Each document has Download PDF, Open original PDF, and Enlarge certificate controls; enlargement opens the full-screen viewer.
- **Contact:** working email, phone, LinkedIn, and Manila location.

The footer contains only the logo, full name, and Computer Science / Data Science identity. The decorative `dm` hero illustration is restored. The companion picker and cursor-following behavior have been removed.

## Light and dark mode

The navigation's moon/sun button names the action in its accessible label. The first visit follows `prefers-color-scheme`; subsequent system changes are followed until a manual selection is made. Manual selections are saved under `portfolio-theme` in localStorage and synchronized across tabs. If storage is unavailable, the toggle still works for the current page.

`public/theme.js` runs synchronously before the stylesheet and body content. It is external and works with the existing Content Security Policy. Theme variables live at the top of `public/styles.css`. Certificates, the school logo, poster, award retain their original colors.

## Update content and assets

- `src/content.mjs`: personal facts, links, skills, project stack/contributions/awards, experience, certificate metadata, and education.
- `src/render.mjs`: page and dialog markup.
- `public/main.js`: view navigation, dialogs, and award reveal.
- `public/theme.js`: initial view and theme preferences.
- `public/styles.css`: both palettes, layout, responsive states, and focus styles.
- `public/assets/Mongaya_Resume.pdf`: original supplied resume, updated November 12, 2026.
- `public/assets/jobpath-poster.png`: original JobPath poster.
- `public/assets/best-thesis-award.jpeg`: original team award photo.
- `public/assets/feutechlogo.png`: supplied FEU logo, displayed without cropping on white backing.
- `public/assets/certificates/`: original PDFs and JPEG previews rendered from their complete first pages.

The build validates all referenced document and image assets before generating `dist/`. Keep unsupported profile, repository, or certificate URLs empty. Actual personal GitHub and project repository links are separate; no personal GitHub profile has been inferred from the team repository.

## Sources

Personal claims and individual contributions come from the supplied resume and Dwayne's explicit updates. Team results are distinguished from individual contributions. The team is **Gray Men**, with four members. The Best Thesis Award caption is preserved exactly:

> Best Thesis Award - Behavioral, Human, and Social Analytics | FEU Institute of Technology | 2026

Dwayne supplied the [JobPath repository](https://github.com/Neater17/jobpath) on November 18, 2026. The stack was verified using its [frontend manifest](https://github.com/Neater17/jobpath/blob/main/frontend/package.json), [backend manifest](https://github.com/Neater17/jobpath/blob/main/backend/package.json), and [Python requirements](https://github.com/Neater17/jobpath/blob/main/Python/requirements.txt). Those sources establish the project's technologies; they do not establish new individual skills or additional contributions.

The certificate attachment dates remain the actual issue/exam dates, rather than the newer download filenames: Python — July 16, 2025; CCNA course — August 2, 2025; Linux course — March 23, 2025. The original PDFs are included for viewing. Python validity and verification code are transcribed from Dwayne’s own document (five years from issue; `wqW8Q-2FvW`). Its verification link uses the `verify.certiport.com` address printed on that document. No dates, names, or codes were copied from the layout reference.

## Deploy to Vercel

`vercel.json` configures **Other** as the framework, **`npm run build`** as the build command, and **`dist`** as the output directory. No environment variables are required.

Import the Git repository through Vercel's dashboard, or use the Vercel CLI from this folder:

```sh
vercel
```

For production publication after review:

```sh
vercel --prod
```

Anonymous temporary previews can be created using current CLI support:

```sh
vercel deploy --temporary --yes
```

The CLI reports the preview's expiration time and claim link. A temporary preview does not update an existing account-owned production site. Claim it before expiry to retain it. No Git commits or pushes are made by the local build workflow.

The static output requires no SPA rewrite because navigation uses URL hashes. Basic security headers permit local scripts and assets; update the Content Security Policy if adding external services later. Configuration references: [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json) and [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
