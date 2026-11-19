# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal CV/résumé site for Nguyen Tuan Vinh. It is one static HTML file, `index.html`, with inline CSS and JS. There is no build step, package manager, linter or test suite.

- **Preview locally:** open `index.html` in a browser, or run `python3 -m http.server`. Use the server when testing the Download button, because it `fetch`es `index.html`, which fails over `file://`.
- **Deploy:** every push to `main` triggers `.github/workflows/pages.yml`, which publishes the repo root to GitHub Pages as-is. `.nojekyll` turns off Jekyll processing. Pushing to `main` therefore publishes immediately.

## Architecture notes

- **Content layout:** each CV part is a `<section id="...">` (professional-summary, core-skills, professional-experience, education, languages, interests). Each job inside `#professional-experience` is an `<article>` with an `<h3>` that reads `Title | Company, Location | Dates`, then a short intro `<p>` and a `<ul>` of achievements.
- **PDF download:** the "Download" link (`#convertButton`) fetches the served `index.html`, base64-encodes it and POSTs it to an external service (`https://cv-gennerate.onrender.com/generate-pdf`), which sends back the PDF. The PDF is rendered from the **deployed** HTML, so changes reach the PDF only after they are pushed. The `!important` declarations on body and header styles are probably there to force the right rendering in that service. Keep them unless you have checked the PDF output.
- **Styling:** everything lives in the inline `<style>` block. There are `@media print` and `@media (max-width: 600px)` overrides, so check both when changing layout.
- **Analytics:** a Google Analytics tag (`G-8N0Y12KZCW`) sits in `<head>`, and the Download link fires a gtag event.

## Conventions

- When editing CV content, keep the title, the `<title>` tag, the header headline and the professional summary consistent with each other (e.g. role name, years of experience).
- Commit history uses small, single-purpose commits with messages like "Update X to Y".
