import { expect, test } from '@playwright/test';

test('home page introduces Terry Chen', async ({ page }) => {
  const response = await page.goto('./');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Terry Chen');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Terry Chen/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Terry Chen');
});
