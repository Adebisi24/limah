import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
export default defineConfig({
  devToolbar: { enabled: false },
  site: process.env.SITE_URL || undefined,
  integrations: [
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '9tacupln',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2026-09-24',
      useCdn: false,
    }),
  ],
});
