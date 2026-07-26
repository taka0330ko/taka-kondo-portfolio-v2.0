// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  // ClientRouter enables prefetchAll by default, which prefetches every <a>
  // on the page (including in-page "#section" TOC links) by re-fetching the
  // current page in the background. That competes with in-flight video
  // requests on the same page and was causing autoplay videos to fail to
  // load, especially on first visit. Require opt-in via data-astro-prefetch
  // instead of prefetching everything automatically.
  prefetch: {
    prefetchAll: false
  }
});