// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svgLoader from 'vite-svg-loader';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  redirects: {
    // Catch-all: redirect non-existent routes to 404
    '/innovation/[id]': '/404'
  },
  vite: {
    plugins: [tailwindcss(), svgLoader()]
  },

  integrations: [vue()]
});
