import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const projectSchema = z.object({
  title: z.string(),
  eyebrow: z.string(),
  summary: z.string(),
  outcome: z.string(),
  metrics: z.array(z.string()),
  technologies: z.array(z.string()),
  href: z.url().optional(),
  hrefLabel: z.string().optional(),
  featured: z.boolean(),
  order: z.number().int(),
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
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
    type: 'content',
    schema: projectSchema,
  }),
  experience: defineCollection({
    type: 'content',
    schema: experienceSchema,
  }),
  writing: defineCollection({
    type: 'content',
    schema: writingSchema,
  }),
};
