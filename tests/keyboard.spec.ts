import { expect, test } from '@playwright/test';
import { crawlSite } from './crawl';

test('skip link is the first focusable element and moves focus to main content', async ({
  page,
  request,
}) => {
  for (const url of await crawlSite(page, request)) {
    await page.goto(url);

    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip, url).toBeFocused();
    await expect(skip, url).toBeInViewport();

    await page.keyboard.press('Enter');
    await expect(page.getByRole('main'), url).toBeFocused();
  }
});

test('tabbing reaches every interactive element with a visible focus ring and no traps', async ({
  page,
  request,
}) => {
  for (const url of await crawlSite(page, request)) {
    await page.goto(url);
    const focusable = await page
      .locator('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      .count();
    expect(focusable, url).toBeGreaterThan(0);

    const reached = new Set<string>();
    // One extra Tab past the last element wraps focus out of the page, proving nothing traps it.
    for (let i = 0; i <= focusable; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const style = getComputedStyle(el);
        const ringVisible = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;
        const rect = el.getBoundingClientRect();
        return {
          key: `${el.tagName}|${el.getAttribute('href') ?? ''}|${el.textContent}|${el.getAttribute('aria-label') ?? ''}|${rect.x},${rect.y}`,
          ringVisible,
          onScreen: rect.width > 0 && rect.height > 0,
        };
      });
      if (i === focusable) {
        expect(focused, `${url}: focus should leave the page after the last element`).toBeNull();
        break;
      }
      expect(focused, `${url}: Tab #${i + 1} landed nowhere`).not.toBeNull();
      expect(focused!.ringVisible, `${url}: ${focused!.key} has no visible focus ring`).toBe(true);
      expect(focused!.onScreen, `${url}: ${focused!.key} is focused but not visible`).toBe(true);
      reached.add(focused!.key);
    }
    expect(reached.size, `${url}: every interactive element is reachable`).toBe(focusable);
  }
});
