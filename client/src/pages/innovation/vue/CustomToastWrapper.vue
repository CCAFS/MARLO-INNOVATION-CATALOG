<script setup lang="ts">
import Toast from 'primevue/toast';

import PrimeProvider from '~/providers/PrimeProvider.vue';
import CustomToast from './CustomToast.vue';
</script>

<template>
  <PrimeProvider>
    <Toast position="bottom-left" />
    <CustomToast />
  </PrimeProvider>
</template>
