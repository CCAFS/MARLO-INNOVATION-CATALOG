<script setup lang="ts">
const props = defineProps<{
  class: string;
  filter: string;
  x: number;
  y: number;
  fill: string;
  activeIndex: number;
  index: number;
  pathD: string;
}>();

const emit = defineEmits<{
  click: [index: number];
}>();
</script>
<template>
  <g :class="class" :filter="filter" @click="emit('click', index)">
    <rect :x="x" :y="y" width="37" height="37" rx="18.5" :fill="fill" shape-rendering="crispEdges"></rect>
    <rect
      :x="x + 2.5"
      :y="y + 2.5"
      width="32"
      height="32"
      rx="16"
      :stroke="activeIndex === index ? '#F39619' : 'white'"
      stroke-width="5"
      shape-rendering="crispEdges"></rect>
    <path :d="pathD" fill="white"></path>
  </g>
</template>
