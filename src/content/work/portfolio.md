---
title: Portfolio site redesign
summary: This site, rebuilt from a React SPA on Firebase into static Astro pages on GitHub Pages, gated by browser tests and Lighthouse.
tech:
  - Astro
  - TypeScript
  - Tailwind CSS v4
  - Playwright
  - axe-core
  - Lighthouse CI
  - GitHub Actions
  - GitHub Pages
repository: https://github.com/azthrun/dreambig-app-portfolios
featured: true
order: 2
status: Live on GitHub Pages. Version 1 complete; later refreshes planned.
---

## Summary

The portfolio you're reading is a small static site: Home, a résumé page with a downloadable PDF, and one page per case study. It replaced a single-page React app hosted on Firebase. Every page is plain HTML with no client-side routing, and the only JavaScript is two small inline scripts for the light and dark themes. Each push to `develop` is built, checked in a real browser and audited by Lighthouse before it deploys to GitHub Pages.

## Problem

The old site was a single scrolling page with a handful of repository cards, each described in one line. It said little about how I work, and it gave recruiters no obvious next step: no résumé and no email address.

It also carried more machinery than a few pages of text need. The Vite and React bundle had to load before anything rendered, a third-party chatbot and Google Fonts added requests to other origins, and hosting depended on Firebase and its deploy workflow. There were no tests, so accessibility and dark mode kept working only as long as nobody broke them.

## My role

I own the site end to end: the redesign spec, content, visual design, implementation, test suite, CI pipeline and the hosting move.

## Approach & key decisions

**Astro with static output instead of a SPA.** The site is content, not an application. Astro renders each route to HTML at build time and ships no framework runtime, so a page is readable as soon as its HTML and CSS arrive. Case studies are Markdown in a content collection whose schema requires a title, one-line summary, tech list, repository link, status and ordering; an entry missing a field fails the build. Profile data lives in one typed module that both Home and the résumé render from, so they can't disagree.

**GitHub Pages instead of Firebase Hosting.** The code already lives on GitHub, and a static site needs nothing Firebase offers beyond file hosting. One GitHub Actions workflow now builds, tests and deploys, and the Firebase workflow and config are gone. Pages serves the site as a project site under `/dreambig-app-portfolios/`, so every internal link and asset is built from Astro's base URL rather than `/`, and a crawl test catches any that slip.

**Test the site the way a visitor meets it.** Playwright drives the production build, served by a small script that mimics GitHub Pages: everything under the base path, directories resolve to `index.html`, and anything else is a 404. There are no component unit tests. Most checks crawl every page reachable from Home, so a newly linked page is covered by them automatically:

- every route returns 200 and every internal link and asset resolves under the base path
- no request goes to a third-party origin
- axe-core reports zero violations in both light and dark themes
- the skip link comes first and moves focus to the main content, every interactive element shows a focus ring, and tabbing never gets trapped
- with reduced motion emulated, nothing animates, transitions or scrolls smoothly
- nothing scrolls horizontally at 360px wide
- the résumé prints without navigation or the theme toggle, in black and grey whichever theme is active

**Dark mode without a flash.** A tiny inline script in `<head>`, placed before any stylesheet, reads the saved choice from `localStorage` or falls back to the system preference and sets the `dark` class before the first paint. The toggle is a second inline script that flips the class and saves the choice. A test records the theme at the moment `<body>` is parsed to prove the class is already set, and another asserts these two inline scripts are the only JavaScript on any page.

```js
var dark;
try {
  var stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') dark = stored === 'dark';
} catch (e) {}
if (dark === undefined) dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', dark);
```

**Design tokens defined once.** Colors for both themes, the type scale and spacing live as CSS variables in one stylesheet. Dark mode overrides the same variables rather than adding `dark:` variants everywhere, and every text color was chosen to meet WCAG AA contrast against its backgrounds in both themes. Newsreader and Inter are self-hosted, and images are WebP resized at build time.

**Lighthouse as a deploy gate.** Lighthouse CI audits every page in the build with its mobile preset, best of three runs, and fails the job below 100 for accessibility, 100 for SEO or 95 for performance. It discovers pages from the build output, and a Playwright test checks that list matches what the crawler reaches, so no page escapes the audit. A failing test or threshold stops the deploy.

## Tech

- Astro with static output, TypeScript and Markdown content collections
- Tailwind CSS v4 with class-based dark mode and self-hosted fonts via Fontsource
- Playwright and axe-core against the production build
- Lighthouse CI
- GitHub Actions deploying to GitHub Pages

## Outcome / current status

Version 1 is live on GitHub Pages with Home, the résumé and PDF, and two case studies. The chatbot, Google Fonts, the React app and the Firebase config and workflow have been removed. The browser test suite and Lighthouse thresholds pass in CI on every deploy.

This is a personal site, so there are no traffic or conversion numbers to report. Planned refreshes, in order: generate the résumé PDF in CI instead of exporting it by hand, per-page social preview images, and more case studies.
