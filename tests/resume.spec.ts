import { expect, test } from '@playwright/test';
import { profile } from '../src/data/profile';
import { siteUrl } from './crawl';

test('résumé shows every role with all its highlights, and all education', async ({ page }) => {
  const response = await page.goto('resume/');
  expect(response?.status()).toBe(200);

  const experience = page.getByRole('region', { name: 'Experience' });
  for (const { role, highlights } of profile.experience) {
    const entry = experience.getByRole('article').filter({
      has: page.getByRole('heading', { name: role }),
    });
    await expect(entry).toHaveCount(1);
    await expect(entry.getByRole('listitem')).toHaveText(highlights);
  }

  const education = page.getByRole('region', { name: 'Education' });
  for (const { degree, details } of profile.education) {
    const entry = education.getByRole('article').filter({
      has: page.getByRole('heading', { name: degree }),
    });
    await expect(entry).toHaveCount(1);
    await expect(entry.getByRole('listitem')).toHaveText(details);
  }
});

test('résumé lists contact details so a printed copy can be followed up', async ({ page }) => {
  await page.goto('resume/');

  const main = page.getByRole('main');
  await expect(main.getByRole('link', { name: profile.email })).toHaveAttribute(
    'href',
    `mailto:${profile.email}`,
  );
  await expect(main.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
    'href',
    profile.linkedIn,
  );
});

test('résumé links to the downloadable PDF', async ({ page }) => {
  await page.goto('resume/');

  const pdf = page.getByRole('main').getByRole('link', { name: /PDF/ });
  await expect(pdf).toHaveAttribute('download', '');
  // The crawl checks it resolves once the PDF is committed.
  const href = new URL((await pdf.getAttribute('href'))!, page.url()).href;
  expect(href).toMatch(new RegExp(`^${siteUrl('')}[\\w-]+\\.pdf$`));
});

test.describe('printing the résumé', () => {
  test('hides screen-only chrome and keeps the content', async ({ page }) => {
    await page.goto('resume/');
    await page.emulateMedia({ media: 'print' });

    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeHidden();
    await expect(page.getByRole('banner')).toBeHidden();
    await expect(page.getByRole('navigation')).toBeHidden();
    await expect(page.getByRole('button', { name: /theme/i })).toBeHidden();
    await expect(page.getByRole('contentinfo')).toBeHidden();
    await expect(page.getByRole('link', { name: /PDF/ })).toBeHidden();

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Experience' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Education' })).toBeVisible();
  });

  test('prints dark grey-scale text even when the dark theme is active', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('resume/');
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
    await page.emulateMedia({ colorScheme: 'dark', media: 'print' });

    const colors = await page
      .getByRole('main')
      .locator('h1, h2, h3, p, li, a')
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).color));
    expect(colors.length).toBeGreaterThan(0);
    for (const color of new Set(colors)) {
      const [r, g, b] = color.match(/\d+/g)!.map(Number);
      expect(r === g && g === b && r <= 0x55, color).toBe(true);
    }
  });
});
