import { expect, test } from '@playwright/test';
import { crawlSite } from './crawl';

test('with reduced motion, nothing animates, transitions or scrolls smoothly', async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const url of await crawlSite(page, request)) {
    await page.goto(url);
    const moving = await page.evaluate(() =>
      [document.documentElement, ...document.querySelectorAll('*')].flatMap((el) =>
        [null, '::before', '::after'].flatMap((pseudo) => {
          const style = getComputedStyle(el, pseudo);
          const durations = [style.animationDuration, style.transitionDuration]
            .flatMap((d) => d.split(','))
            .map((d) => parseFloat(d));
          const animated = style.animationName !== 'none' || durations.some((d) => d > 0);
          const smooth = style.scrollBehavior === 'smooth';
          return animated || smooth ? [`${el.tagName.toLowerCase()}${pseudo ?? ''}`] : [];
        }),
      ),
    );

    expect(moving, url).toEqual([]);
  }
});
