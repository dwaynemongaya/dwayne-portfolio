# Dwayne Mongaya — personal portfolio

A responsive, static internship portfolio built with HTML, CSS, JavaScript, and a small Node.js build script. The starting folder was empty, so there was no existing framework to preserve. There are no third-party packages, external fonts, API keys, or runtime services to configure. Personal content is rendered into HTML at build time and remains readable without JavaScript.

## Preview locally

Use Node.js 22 or newer:

```sh
npm run dev
```

Open **http://localhost:5173**. The development server restarts when imported content or rendering code changes; refresh the browser to see updates. CSS and browser JavaScript are served directly from `public/`.

To check the deployable output:

```sh
npm run check
npm run build
npm run preview
```

Open **http://localhost:4173**. Stop either server with Ctrl+C. Set `PORT` if either default port is occupied. No dependency installation is required.

## Deploy to Vercel

The project is prepared for Vercel; it has not been published automatically.

1. Put this project in a Git repository and push it to your Git provider.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Use **Other** as the framework preset, **`npm run build`** as the build command, and **`dist`** as the output directory. Leave the install command blank. `vercel.json` already specifies the build and output settings.
4. Use Node.js **24.x** (or another supported version satisfying `>=22`) and deploy. No environment variables are needed.

Alternatively, from this folder with the Vercel CLI installed and authenticated:

```sh
vercel
```

This creates a preview deployment. When ready to publish to production:

```sh
vercel --prod
```

Vercel serves the generated `dist/` files. No SPA rewrite is necessary. `vercel.json` also sets basic response headers. The configured Content Security Policy permits this site's local assets; update it if adding external assets or scripts later.

Configuration references: [Vercel static project configuration](https://vercel.com/docs/project-configuration/vercel-json) and [supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Update content

- **`src/content.mjs`**: name, introduction, contact details, skills, projects, experience, certifications, education, and optional URLs.
- **`src/render.mjs`**: page markup and section order.
- **`public/styles.css`**: colors, typography, spacing, responsive layouts, and motion preferences.
- **`public/main.js`**: mobile menu and active navigation. Section links work without it.
- **`public/theme.js`**: theme initialization, system preference tracking, and the navigation toggle.
- **`public/assets/jobpath-poster.png`**: original, unedited JobPath poster.
- **`public/assets/feutechlogo.png`** and **`public/assets/mclogo.png`**: original school logos, displayed on equal white backgrounds without cropping or recoloring.

Keep optional GitHub, LinkedIn, project repository, and certificate URLs empty until actual links are supplied. They are omitted automatically. Replace images in `public/assets/` and run the build again after edits. The build checks that referenced project images and school logos exist. Education entries are an ordered array in `src/content.mjs`.

## Light and dark mode

The navigation's moon/sun button switches to the theme named in its accessible label. It remains visible when the mobile menu is closed. The first visit follows `prefers-color-scheme`, including later system changes until a manual selection is made. A manual selection is stored in localStorage under `portfolio-theme` and takes priority on later visits. Clearing that key restores system preference behavior. Theme selections also synchronize across tabs; if storage is blocked, the toggle still works for the current page.

`public/theme.js` runs synchronously in the document head before the stylesheet and page content to prevent a flash of the wrong theme. It is an external script compatible with the existing Content Security Policy. Light and dark palette variables live at the top of `public/styles.css`. School logos and the JobPath poster retain their original colors in both themes.

## Source and content decisions

Personal facts come from the supplied `Mongaya_Resume.pdf`, with the senior high school details supplied directly by Dwayne. The supplied `JobPath_pic.png` is used only as the project's original visual; no skills, results, metrics, or technology claims were inferred from its artwork.

The resume download and education recognition are omitted at Dwayne's request. The resume PDF is not included in the public site assets.

- The introduction is a concise paraphrase of the resume summary.
- The page order is Profile, Skills, Projects, Experience, Certifications, Educational background, Contact.
- JobPath is explicitly identified as a four-member team project. Its team outcome and Dwayne's contributions are described separately.
- The resume names Codex in the project's development workflow. Its supplied `vercel.app` link identifies Vercel as the deployment platform. No framework or full stack is claimed because the resume does not specify one.
- The provided live JobPath URL is included. No GitHub profile, repository, LinkedIn, or certificate URLs were supplied.
- Certification names and years are shown without invented issuers, credential IDs, or certificate links.
- Experience dates and the education's `2023 – Present` wording follow the resume. No graduation date is inferred.
- The college entry is followed by Meycauayan College, Inc., Senior High School, 2021–2023, with the Science, Technology, Engineering, and Mathematics (STEM) strand. Both school logos were supplied by Dwayne.
- The full name, Manila location, email, and phone number follow the resume.
- The poster retains its original proportions, colors, and appearance. Clicking it or **View full poster** opens the full original image in a new tab.

## Accessibility

The site includes semantic landmarks and headings, a skip link, named navigation, visible keyboard focus, meaningful image text, native links, and a mobile menu with `aria-expanded` and Escape support. There are no skill bars or percentage ratings. The supplied lighter accent colors are used decoratively or with dark text; secondary text uses a darker color. Motion is limited to hover and scrolling, with `prefers-reduced-motion` support.
