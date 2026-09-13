import { expect, type APIRequestContext, type Page } from '@playwright/test';
import { basePath, origin } from '../playwright.config';

// Entry points a visitor or crawler can reach directly. Everything else is discovered by crawling.
export const routes = ['./', 'resume/', 'robots.txt', 'humans.txt'];
const pageRoutes = routes.filter((route) => route.endsWith('/'));

export const siteUrl = (path: string) => new URL(path, `${origin}${basePath}`).href;

// Linked files that are committed in a later ticket, so the crawl skips them until they land.
// Remove the résumé PDF once it is exported and committed.
export const pendingAssets = [siteUrl('terry-chen-resume.pdf')];

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
export async function crawlSite(page: Page, request: APIRequestContext): Promise<string[]> {
  const queue = pageRoutes.map(siteUrl);
  const seen = new Set(queue);
  const visited: string[] = [];

  while (queue.length > 0) {
    const url = queue.shift()!;
    await page.goto(url);
    visited.push(url);

    for (const linked of await linkedUrls(page)) {
      if (new URL(linked).origin !== origin || seen.has(linked) || pendingAssets.includes(linked))
        continue;
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
