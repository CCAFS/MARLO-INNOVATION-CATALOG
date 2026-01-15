<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import { ToastService } from 'primevue';

const inst = getCurrentInstance();
const app = inst?.appContext.app;

// evita doble instalación si el HMR re-monta
if (app && !app._context.provides['primevue']) {
  app.use(PrimeVue, {
    theme: { preset: Aura, options: { darkModeSelector: '' } }
  });

  app.use(ToastService);
}
</script>

<template>
  <slot />
</template>
