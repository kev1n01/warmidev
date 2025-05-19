// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { esES } from '@clerk/localizations'
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    clerk({
      localization: esES,
    }),
    vue()
  ],
  server: {
    host: true,
    port: 3005,
  },
  adapter: node({mode: 'standalone'}),
  output: 'server',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'qh'],
    routing: {
      prefixDefaultLocale: false, // set always prefix the default locale and others, if true redirect is true
      // redirectToDefaultLocale: true // redirect to the default locale
    },
  }
});