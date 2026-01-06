<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';

let toast: ReturnType<typeof useToast>;

// Define the global function first (even if toast initialization fails later)
(globalThis as any).onUseToast = (options: {
  severity?: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
}) => {
  if (!toast) {
    console.warn('Toast not initialized yet');
    return;
  }
  toast.add(options);
};

onMounted(() => {
  toast = useToast();
});
</script>

<template />
