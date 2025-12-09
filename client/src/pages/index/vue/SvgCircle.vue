<script setup lang="ts">
const props = defineProps<{
  class: string;
  filter: string;
  x: number;
  y: number;
  fill: string;
  activeIndex: number | null;
  index: number;
  pathD: string;
}>();

const emit = defineEmits<{
  click: [index: number];
}>();
</script>
<template>
  <g :class="class" :filter="filter" @click="emit('click', index)" style="pointer-events: auto">
    <rect :x="x" :y="y" width="37" height="37" rx="18.5" :fill="fill" shape-rendering="crispEdges"></rect>
    <rect
      :x="x + 2.5"
      :y="y + 2.5"
      width="32"
      height="32"
      rx="16"
      :stroke="activeIndex === index ? '#F39619' : 'white'"
      stroke-width="5"
      fill="none"
      shape-rendering="geometricPrecision"
      style="pointer-events: none"></rect>
    <path :d="pathD" fill="white" style="pointer-events: none"></path>
  </g>
</template>
