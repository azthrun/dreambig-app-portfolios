import { expect, test, type Page } from '@playwright/test';

const html = (page: Page) => page.locator('html');

for (const scheme of ['light', 'dark'] as const) {
  test(`first load follows a ${scheme} system theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('./');

    if (scheme === 'dark') await expect(html(page)).toHaveClass(/\bdark\b/);
    else await expect(html(page)).not.toHaveClass(/\bdark\b/);
  });
}

for (const { stored, expectDark } of [
  { stored: null, expectDark: true },
  { stored: 'light', expectDark: false },
]) {
  test(`theme class is set before the page body is parsed (dark system, stored ${stored})`, async ({
    page,
  }) => {
    // Records the theme at the moment <body> is inserted, which is before anything can paint.
    await page.addInitScript((stored) => {
      if (stored) localStorage.setItem('theme', stored);
      new MutationObserver((_, observer) => {
        if (!document.body) return;
        observer.disconnect();
        document.documentElement.dataset.darkAtBody = String(
          document.documentElement.classList.contains('dark'),
        );
      }).observe(document, { childList: true, subtree: true });
    }, stored);
    await page.emulateMedia({ colorScheme: 'dark' });

    await page.goto('./');

    await expect(html(page)).toHaveAttribute('data-dark-at-body', String(expectDark));
  });
}

test('theme toggle overrides the system theme and survives a reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');
  const toggle = page.getByRole('button', { name: /dark theme/i });

  await toggle.click();
  await expect(html(page)).toHaveClass(/\bdark\b/);
  await expect(page.getByRole('button', { name: /light theme/i })).toBeVisible();

  await page.reload();
  await expect(html(page)).toHaveClass(/\bdark\b/);

  await page.getByRole('button', { name: /light theme/i }).click();
  await expect(html(page)).not.toHaveClass(/\bdark\b/);
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload();
  await expect(html(page)).not.toHaveClass(/\bdark\b/);
});
