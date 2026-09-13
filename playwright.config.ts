import { defineConfig, devices } from '@playwright/test';

const port = 4321;
export const basePath = '/dreambig-app-portfolios/';
export const origin = `http://127.0.0.1:${port}`;

// Tests run against the production build (`npm run build` first), served under the
// same base path GitHub Pages uses.
export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `${origin}${basePath}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node scripts/serve-dist.mjs',
    env: { PORT: String(port) },
    url: `${origin}${basePath}robots.txt`,
    reuseExistingServer: !process.env.CI,
  },
});
