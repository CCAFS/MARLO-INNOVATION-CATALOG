import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';

export default (app: App) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: { darkModeSelector: '' }
    }
  });

  app.use(ToastService);
};
