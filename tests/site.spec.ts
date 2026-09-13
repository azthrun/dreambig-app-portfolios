import { expect, test } from '@playwright/test';
import { origin } from '../playwright.config';
import { crawlSite, routes, siteUrl } from './crawl';

for (const route of routes) {
  test(`${route} returns 200 under the base path`, async ({ request }) => {
    const response = await request.get(siteUrl(route));
    expect(response.status()).toBe(200);
  });
}

test('every internal link and asset resolves under the base path', async ({ page, request }) => {
  await crawlSite(page, request);
});

test('pages make no requests to third-party origins', async ({ page, request }) => {
  const pages = await crawlSite(page, request);

  const thirdParty: string[] = [];
  page.on('request', (req) => {
    const url = new URL(req.url());
    if (url.protocol.startsWith('http') && url.origin !== origin) thirdParty.push(req.url());
  });

  for (const url of pages) {
    await page.goto(url, { waitUntil: 'networkidle' });
  }

  expect(thirdParty).toEqual([]);
});
