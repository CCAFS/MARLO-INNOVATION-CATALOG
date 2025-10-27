<script setup lang="ts">
const props = defineProps<{
  id: string;
  title: string;
  pathD: string;
  fill: string;
  stroke: string;
}>();
console.log(props.id);
console.log('ho');
</script>

<template>
  <path :d="props.pathD" :title="props.title" :fill="props.fill" :stroke="props.stroke" :stroke-width="1" :id="props.id" />
</template>
