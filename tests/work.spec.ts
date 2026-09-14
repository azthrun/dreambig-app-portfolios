import { expect, test } from '@playwright/test';

const caseStudies = [
  {
    slug: 'sourcegen-dapper',
    title: 'DreamBig.SourceGen.Dapper',
    description: /Dapper/,
    repository: 'https://github.com/azthrun/dreambig-sourcegen-dapper',
  },
  {
    slug: 'portfolio',
    title: 'Portfolio site redesign',
    description: /Astro/,
    repository: 'https://github.com/azthrun/dreambig-app-portfolios',
  },
];

for (const { slug, title, description, repository } of caseStudies) {
  test(`${title} case study follows the case study template`, async ({ page }) => {
    const response = await page.goto(`work/${slug}/`);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(`${title} · Case study · Terry Chen`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);

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

  test(`${title} case study links to its public repository`, async ({ page }) => {
    await page.goto(`work/${slug}/`);

    const links = page.getByRole('main').getByRole('link', { name: 'Source code on GitHub' });
    await expect(links).toHaveCount(1);
    await expect(links).toHaveAttribute('href', repository);
  });
}
