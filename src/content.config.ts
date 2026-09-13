// Case studies: one Markdown file per entry in src/content/work/, served at /work/<file name>/.
// The schema is the content gate: an entry missing a required field fails the build.
// Bodies follow the template: Summary → Problem → My role → Approach & key decisions → Tech →
// Outcome / current status → Links. No invented metrics.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string().min(1),
    // Used as the meta description and on Home cards, so it stays on one line.
    summary: z
      .string()
      .min(1)
      .regex(/^[^\n]+$/, 'summary must be one line'),
    tech: z.array(z.string().min(1)).min(1),
    repository: z.url({ protocol: /^https$/ }),
    docs: z.url({ protocol: /^https$/ }).optional(),
    // Featured entries appear on Home, lowest order first.
    featured: z.boolean(),
    order: z.number().int(),
    status: z.string().min(1),
  }),
});

export const collections = { work };
