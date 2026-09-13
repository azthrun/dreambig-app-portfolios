// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Served from GitHub Pages as a project site, so every URL lives under the repo name.
export default defineConfig({
  site: 'https://azthrun.github.io',
  base: '/dreambig-app-portfolios/',
  trailingSlash: 'always',
  output: 'static',
  markdown: {
    // Code blocks carry both palettes as CSS variables; the case study page picks one per theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
