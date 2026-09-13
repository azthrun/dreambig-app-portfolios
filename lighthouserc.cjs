// Lighthouse CI config. Audits every page in the production build, served under the GitHub Pages
// base path by scripts/serve-dist.mjs. Pages are discovered from dist/, so new pages need no edits here.
const { existsSync, readdirSync } = require('node:fs');
const { join, relative, sep } = require('node:path');

const basePath = '/dreambig-app-portfolios/';
const port = 4321;
const origin = `http://127.0.0.1:${port}`;
const dist = join(__dirname, 'dist');

if (!existsSync(dist)) throw new Error('dist/ not found: run `npm run build` first');

// Every directory with an index.html is a page, served at its trailing-slash URL.
const pageUrls = readdirSync(dist, { recursive: true })
  .filter((file) => file === 'index.html' || file.endsWith(`${sep}index.html`))
  .map((file) => {
    const dir = relative(dist, join(dist, file, '..'))
      .split(sep)
      .join('/');
    return `${origin}${basePath}${dir ? `${dir}/` : ''}`;
  });

module.exports = {
  ci: {
    collect: {
      url: pageUrls,
      startServerCommand: `PORT=${port} node scripts/serve-dist.mjs`,
      // Matches the startup log line in scripts/serve-dist.mjs.
      startServerReadyPattern: 'Serving dist/',
      // Performance varies run to run; assertions use the best of these runs by default.
      numberOfRuns: 3,
      // Lighthouse's default mobile preset (emulated phone, throttled network and CPU).
      settings: { onlyCategories: ['performance', 'accessibility', 'seo'] },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        'categories:performance': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
};
