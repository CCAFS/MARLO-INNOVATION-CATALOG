import { createApp, type Component } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

// This file runs for each island that Astro mounts,
// but this is where you can access Vue's real "app".
export default (App: Component, props: Record<string, any>, slots: any) => {
  const app = createApp(App, props);

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: { darkModeSelector: '' }
    }
  });

  // Register globals if you want:
  // import Button from 'primevue/button';
  // app.component('PButton', Button);

  return app;
};
