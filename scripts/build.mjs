import { cp, mkdir, writeFile, rm, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { render } from '../src/render.mjs';
import { projects, education } from '../src/content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = new URL('../dist/', import.meta.url);
// Catch missing supplied attachments before producing a deployable artifact.
for (const asset of [...projects.map(project => project.image), ...education.map(school => school.logo)].filter(Boolean)) {
  await access(`${root}public${asset}`);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL('../public/', import.meta.url), output, { recursive: true });
await writeFile(new URL('index.html', output), render());
await writeFile(new URL('404.html', output), '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light dark"><title>Page not found | Dwayne Mongaya</title><script src="/theme.js"></script><link rel="stylesheet" href="/styles.css"><main class="container not-found"><p class="eyebrow">404</p><h1>Page not found.</h1><a class="button button-dark" href="/">Back to the portfolio</a></main></html>');
console.log('Built static portfolio → dist/ (HTML, CSS, JavaScript, poster, school logos).');
