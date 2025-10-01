import { createApp, type Component } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

// Este archivo se ejecuta para cada isla que Astro monta,
// pero aquí es donde tienes acceso al "app" real de Vue.
export default (App: Component, props: Record<string, any>, slots: any) => {
  const app = createApp(App, props);

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: { darkModeSelector: '' }
    }
  });

  // registra globales si quieres:
  // import Button from 'primevue/button';
  // app.component('PButton', Button);

  return app;
};
