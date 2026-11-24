# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS with vendored GSAP and Lenis (chosen by Dwayne, Nov 25 2026). The site lives in `public/`. The earlier site (src/ + build script) is in git history before the v2 commit.

## Users

Internship recruiters, hiring managers and professors who skim a candidate's portfolio quickly and want to jump straight to About, Projects, Skills, Certification or Contact.

## Product Purpose

Personal portfolio of Dwayne Carmelo M. Mongaya, a graduating BS Computer Science student (Data Science specialization, FEU Institute of Technology), seeking an internship. Success: a visitor remembers the name, finds the projects fast, and contacts him.

## Positioning

A real person, real shipped projects (JobPath, Expense, RowCheck), a Best Thesis Award, and real certificates.

## Capabilities and Constraints

- Content comes from `src/content.mjs` of the original site; nothing is invented.
- Senior high school and Dean's Lister recognition are omitted at Dwayne's request. No birthday. No personal GitHub link (empty on purpose). Project code links omitted.
- Strict CSP in `vercel.json`: self-hosted scripts, styles, fonts, images; no inline scripts or style attributes.
- Intro must be quick and must not replay when navigating between sections.

## Brand Commitments

Name shown as "Dwayne Mongaya" in the intro; full name "Dwayne Carmelo M. Mongaya" in the footer. Portrait supplied by Dwayne (cut out for the hero).

## Evidence on Hand

Resume PDF, three project screenshots/poster, award photo, three certificate PDFs and previews, FEU logo (all in `public/assets`).

## Accessibility & Inclusion

Respect `prefers-reduced-motion`, keyboard focus, readable contrast.
