import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.SITE_URL ?? 'https://omerahat.github.io';
const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: siteUrl,
  base: basePath,
  output: 'static',
  integrations: [sitemap()],
});
