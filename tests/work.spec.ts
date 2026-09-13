import { expect, test } from '@playwright/test';

test('DreamBig.SourceGen.Dapper case study follows the case study template', async ({ page }) => {
  const response = await page.goto('work/sourcegen-dapper/');
  expect(response?.status()).toBe(200);

  await expect(page).toHaveTitle(/DreamBig\.SourceGen\.Dapper/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Dapper/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('DreamBig.SourceGen.Dapper');

  await expect(page.getByRole('main').getByRole('heading', { level: 2 })).toHaveText([
    'Summary',
    'Problem',
    'My role',
    'Approach & key decisions',
    'Tech',
    'Outcome / current status',
    'Links',
  ]);
});

test('case study links to its public repository', async ({ page }) => {
  await page.goto('work/sourcegen-dapper/');

  const links = page.getByRole('main').getByRole('link', { name: 'Source code on GitHub' });
  await expect(links).toHaveCount(1);
  await expect(links).toHaveAttribute(
    'href',
    'https://github.com/azthrun/dreambig-sourcegen-dapper',
  );
});
