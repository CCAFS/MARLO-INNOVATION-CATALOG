<template>The value selected is: {{ display }}</template>
<script setup lang="ts">
import { useSharedValue } from './composables/useSharedValue';

const { value, setValue, display } = useSharedValue();
</script>
