## DreamBig Portfolio (Terry Chen)

Static portfolio site built with Astro and Tailwind CSS, hosted on GitHub Pages at
<https://azthrun.github.io/dreambig-app-portfolios/>.

The site is being rebuilt (see the v1 redesign spec, issue #5). Right now it is a placeholder Home page.

### Stack

- Astro (static output) + TypeScript
- Tailwind CSS v4 (class-based dark mode)
- Playwright browser tests against the production build
- GitHub Actions → GitHub Pages

### Getting started

1. Prerequisites: Node 24 and npm
2. `npm install`
3. `npm run dev` — dev server at <http://localhost:4321/dreambig-app-portfolios/>

### Scripts

- `dev`: start the Astro dev server
- `build`: type-check (`astro check`) and build static output to `dist/`
- `preview`: preview the production build
- `typecheck`: run `astro check`
- `test`: run the Playwright suite against `dist/` (run `npm run build` first; `npx playwright install chromium` once)
- `lighthouse`: run Lighthouse CI against `dist/` (run `npm run build` first; needs Chrome, and on Apple Silicon an arm64 Node)
- `lint`: run ESLint
- `format` / `format:check`: Prettier

### Base path

The site is a GitHub Pages project site, so every URL lives under `/dreambig-app-portfolios/`
(`base` in `astro.config.mjs`). Build internal links and asset URLs from `import.meta.env.BASE_URL`,
never from `/`.

### Tests

Tests exercise the built site only as a visitor or crawler sees it. `scripts/serve-dist.mjs` serves
`dist/` under the base path the way GitHub Pages does (no SPA fallback), and Playwright checks that:

- every route returns 200 under the base path
- every internal link and asset resolves
- no requests go to third-party origins (fonts are self-hosted)
- Lighthouse CI audits exactly the pages the crawler reaches
- axe-core finds zero violations on every page, in light and dark
- the skip link comes first and focuses main; every interactive element shows a focus ring; no keyboard traps
- first load follows the system theme, the toggle overrides it and survives a reload, and the theme
  class is set before `<body>` is parsed
- with reduced motion emulated nothing animates, transitions or scrolls smoothly
- no page scrolls horizontally at 360px wide
- the only JavaScript is the inline pre-paint theme script and the theme toggle

### Lighthouse

`lighthouserc.cjs` audits every page in `dist/` (each `index.html`) with Lighthouse's mobile preset, best
of 3 runs, and fails on accessibility < 100, SEO < 100 or performance < 95. Pages are discovered from
the build, so new pages need no config changes; a Playwright test checks the list matches every page
the crawler reaches. Reports land in `.lighthouseci/`.

### Deploy

`.github/workflows/pages.yml` runs on every push to `develop`: install → build → test → Lighthouse CI →
deploy to GitHub Pages. A failing test or Lighthouse threshold blocks the deploy.

One-time repository setup (manual):

1. Settings → Pages → Source: **GitHub Actions**
2. Settings → Environments → `github-pages` → Deployment branches and tags: allow `develop`

### Project structure

- `public/` — static files copied as-is (robots.txt, humans.txt, logo)
- `src/pages/` — one file per route
- `src/layouts/` — page shell (head, meta, pre-paint theme script, skip link, header, main, footer)
- `src/components/` — header, footer, theme toggle
- `src/assets/` — images optimised at build time (headshot, DreamBig mark)
- `src/styles/` — global CSS and design tokens (colors, fonts, type scale, spacing)
- `src/data/` — profile content
- `tests/` — Playwright suite
- `scripts/` — local tooling

### License

This project is provided as-is for personal portfolio use.
