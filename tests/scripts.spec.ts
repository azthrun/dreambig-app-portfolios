import { expect, test } from '@playwright/test';
import { crawlSite } from './crawl';

test('only the inline theme script and the theme toggle ship JavaScript', async ({
  page,
  request,
}) => {
  const pages = await crawlSite(page, request);

  const scriptRequests: string[] = [];
  page.on('request', (req) => {
    if (req.resourceType() === 'script') scriptRequests.push(req.url());
  });

  for (const url of pages) {
    await page.goto(url, { waitUntil: 'networkidle' });

    const scripts = await page.$$eval('script', (els) => {
      const firstStyles = document.querySelector('link[rel="stylesheet"], style');
      return els.map((el) => ({
        role: el.getAttribute('data-theme-script'),
        external: el.hasAttribute('src'),
        // The pre-paint script must run before any stylesheet is applied.
        beforeStyles:
          !!firstStyles &&
          !!(el.compareDocumentPosition(firstStyles) & Node.DOCUMENT_POSITION_FOLLOWING),
      }));
    });

    expect(scripts, url).toEqual([
      { role: 'prepaint', external: false, beforeStyles: true },
      { role: 'toggle', external: false, beforeStyles: false },
    ]);
  }

  expect(scriptRequests).toEqual([]);
});
