# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal CV/résumé site for Nguyen Tuan Vinh. All of the content is in one static HTML file, `index.html`, with inline CSS. The only tooling is a Playwright script that renders that page to PDF. There is no linter or test suite.

- **Preview locally:** open `index.html` in a browser.
- **Render the PDF locally:** run `npm install` once, then `npm run pdf`, which writes `cv.pdf` (gitignored). Check it whenever you change layout or CSS.
- **Deploy:** every push to `main` triggers `.github/workflows/pages.yml`. It copies `index.html` and `.nojekyll` into `_site/`, renders `_site/cv.pdf` with `scripts/render-pdf.mjs`, and publishes **only `_site/`** to GitHub Pages. A new file that the site needs must be added to that copy step. Pushing to `main` publishes immediately.

## Architecture notes

- **Content layout:** each CV part is a `<section id="...">` (professional-summary, core-skills, professional-experience, education, languages, interests). Each job inside `#professional-experience` is an `<article>` with an `<h3>` that reads `Title | Company, Location | Dates`, then a short intro `<p>` and a `<ul>` of achievements.
- **PDF download:** the "Download PDF" link points at the static `cv.pdf` that CI renders. No external service is involved. The PDF is headless Chromium printing the page with print media, A4 and backgrounds on, so **`@media print` in `index.html` controls how the PDF looks**. Anything wrapped in `.no-print` (such as the Download link) is left out of the PDF.
- **Styling:** everything lives in the inline `<style>` block. Several screen rules use `!important`, so a print override of the same property needs `!important` too. There is also an `@media (max-width: 600px)` block, so check the screen, mobile and PDF output when changing layout.
- **Analytics:** a Google Analytics tag (`G-8N0Y12KZCW`) sits in `<head>`, and the Download link fires a `download_cv` gtag event. The render script blocks every non-`file:` request, so building the PDF never counts as a visit.

## Conventions

- When editing CV content, keep the title, the `<title>` tag, the header headline and the professional summary consistent with each other (e.g. role name, years of experience).
- Commit history uses small, single-purpose commits with messages like "Update X to Y".
