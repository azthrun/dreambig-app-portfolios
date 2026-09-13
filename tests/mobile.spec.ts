import { expect, test } from '@playwright/test';
import { crawlSite } from './crawl';

test.use({ viewport: { width: 360, height: 800 } });

test('no page scrolls horizontally at 360px wide', async ({ page, request }) => {
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme });

    for (const url of await crawlSite(page, request)) {
      await page.goto(url);
      const { scrollWidth, clientWidth } = await page.evaluate(() => {
        const { scrollWidth, clientWidth } = document.documentElement;
        return { scrollWidth, clientWidth };
      });
      expect(scrollWidth, `${url} (${scheme})`).toBeLessThanOrEqual(clientWidth);
    }
  }
});
