<script setup lang="ts">
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';

const props = defineProps<AfricaSvgProps>();
</script>

<template>
  <path :d="props.pathD" :title="props.title" :fill="props.fill" :stroke="props.stroke" :stroke-width="1" :id="props.id" />
</template>
