import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';
import { crawlSite } from './crawl';

const { ci } = createRequire(import.meta.url)('../lighthouserc.cjs');

test('Lighthouse audits every page a visitor can reach', async ({ page, request }) => {
  const pages = await crawlSite(page, request);

  expect([...ci.collect.url].sort()).toEqual([...pages].sort());
});
