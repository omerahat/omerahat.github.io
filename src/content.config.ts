import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectSchema = z.object({
  title: z.string(),
  eyebrow: z.string(),
  summary: z.string(),
  outcome: z.string(),
  metrics: z.array(z.string()),
  technologies: z.array(z.string()),
  poster: z.string().optional(),
  posterAlt: z.string().optional(),
  href: z.url().optional(),
  hrefLabel: z.string().optional(),
  paperHref: z.url().optional(),
  paperHrefLabel: z.string().optional(),
  scholarHref: z.url().optional(),
  scholarHrefLabel: z.string().optional(),
  featured: z.boolean(),
  order: z.number().int(),
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date().optional(),
  location: z.string().optional(),
  current: z.boolean(),
  focus: z.array(z.string()),
  order: z.number().int(),
});

const writingSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  published: z.coerce.date(),
  tags: z.array(z.string()),
  href: z.url(),
  language: z.string(),
  featured: z.boolean(),
  order: z.number().int(),
});

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: projectSchema,
  }),
  experience: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
    schema: experienceSchema,
  }),
  writing: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
    schema: writingSchema,
  }),
};
