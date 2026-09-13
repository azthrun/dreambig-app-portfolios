// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Served from GitHub Pages as a project site, so every URL lives under the repo name.
export default defineConfig({
  site: 'https://azthrun.github.io',
  base: '/dreambig-app-portfolios/',
  trailingSlash: 'always',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
