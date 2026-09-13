import { expect, test } from '@playwright/test';

test('home page introduces Terry Chen', async ({ page }) => {
  const response = await page.goto('./');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Terry Chen');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Terry Chen/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Terry Chen');
});

test('hero shows a headshot and an impact-focused intro', async ({ page }) => {
  await page.goto('./');

  const headshot = page.getByRole('img', { name: /Terry Chen/ });
  await expect(headshot).toBeVisible();
  expect(await headshot.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByRole('main')).toContainText(/senior software engineer/i);
});

test('featured case studies lead to their full write-ups', async ({ page }) => {
  await page.goto('./');

  const featured = page.getByRole('region', { name: 'Featured work' });
  const entry = featured.getByRole('listitem').filter({
    has: page.getByRole('heading', { name: 'DreamBig.SourceGen.Dapper' }),
  });
  await expect(entry).toHaveCount(1);
  await expect(entry).toContainText(/Dapper/);

  await entry.getByRole('link', { name: 'DreamBig.SourceGen.Dapper' }).click();
  await expect(page).toHaveURL(/\/work\/sourcegen-dapper\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('DreamBig.SourceGen.Dapper');
});

test('experience timeline lists each role with its top three highlights', async ({ page }) => {
  await page.goto('./');

  const experience = page.getByRole('region', { name: 'Experience' });
  for (const role of ['Senior Software Engineer', 'Software Analyst']) {
    const entry = experience.getByRole('listitem').filter({
      has: page.getByRole('heading', { name: role }),
    });
    await expect(entry).toHaveCount(1);
    await expect(entry.getByRole('listitem')).toHaveCount(3);
  }
});

test('contact block offers email, LinkedIn and the résumé', async ({ page }) => {
  await page.goto('./');

  const contact = page.getByRole('region', { name: 'Contact' });
  const email = contact.getByRole('link', { name: /@/ });
  await expect(email).toHaveAttribute('href', /^mailto:[^@\s]+@[^@\s]+$/);
  expect(await email.getAttribute('href')).toBe(`mailto:${await email.textContent()}`);

  await expect(contact.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
    'href',
    /^https:\/\/www\.linkedin\.com\/in\//,
  );

  await contact.getByRole('link', { name: /résumé/i }).click();
  await expect(page).toHaveURL(/\/resume\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/résumé/i);
});

test('home leaves education and retired projects to other pages', async ({ page }) => {
  await page.goto('./');

  const main = page.getByRole('main');
  for (const absent of ['Education', 'Faist', 'Web3', 'Repository Generator']) {
    await expect(main).not.toContainText(absent);
  }
});
