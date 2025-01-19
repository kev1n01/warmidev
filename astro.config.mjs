// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'qh'],
    routing: {
      prefixDefaultLocale: false, // set always prefix the default locale and others, if true redirect is true
      // redirectToDefaultLocale: true // redirect to the default locale
    },
  }
});