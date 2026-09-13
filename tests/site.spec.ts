import { expect, test, type APIRequestContext, type Page } from '@playwright/test';
import { basePath, origin } from '../playwright.config';

// Entry points a visitor or crawler can reach directly. Everything else is discovered by crawling.
const routes = ['./', 'robots.txt', 'humans.txt'];
const pageRoutes = routes.filter((route) => route.endsWith('/'));

const siteUrl = (path: string) => new URL(path, `${origin}${basePath}`).href;

async function linkedUrls(page: Page): Promise<string[]> {
  const urls = await page.$$eval(
    'a[href], link[href], img[src], img[srcset], script[src], source[srcset]',
    (els) =>
      els.flatMap((el) => {
        const values = [el.getAttribute('href'), el.getAttribute('src')];
        const srcset = el.getAttribute('srcset');
        if (srcset) values.push(...srcset.split(',').map((s) => s.trim().split(/\s+/)[0]));
        return values.filter((v): v is string => !!v).map((v) => new URL(v, document.baseURI).href);
      }),
  );
  return urls.map((url) => url.split('#')[0]);
}

// Visits every HTML page reachable from the entry points, checking each internal link and asset
// on the way. Returns the URLs of the pages visited.
async function crawlSite(page: Page, request: APIRequestContext): Promise<string[]> {
  const queue = pageRoutes.map(siteUrl);
  const seen = new Set(queue);
  const visited: string[] = [];

  while (queue.length > 0) {
    const url = queue.shift()!;
    await page.goto(url);
    visited.push(url);

    for (const linked of await linkedUrls(page)) {
      if (new URL(linked).origin !== origin || seen.has(linked)) continue;
      seen.add(linked);

      expect(
        new URL(linked).pathname.startsWith(basePath),
        `${linked} must live under the base path`,
      ).toBe(true);
      const response = await request.get(linked);
      expect(response.status(), linked).toBe(200);
      if (response.headers()['content-type']?.startsWith('text/html')) queue.push(linked);
    }
  }

  return visited;
}

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
