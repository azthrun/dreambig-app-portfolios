import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { crawlSite } from './crawl';

for (const scheme of ['light', 'dark'] as const) {
  test(`every page has zero axe violations in the ${scheme} theme`, async ({ page, request }) => {
    await page.emulateMedia({ colorScheme: scheme });

    for (const url of await crawlSite(page, request)) {
      await page.goto(url);
      const html = page.locator('html');
      if (scheme === 'dark') await expect(html).toHaveClass(/\bdark\b/);
      else await expect(html).not.toHaveClass(/\bdark\b/);

      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(
        violations.map(({ id, nodes }) => ({ id, targets: nodes.map((n) => n.target.join(' ')) })),
        url,
      ).toEqual([]);
    }
  });
}
