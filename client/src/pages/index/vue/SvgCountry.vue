<script setup lang="ts">
import { computed } from 'vue';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';

const props = defineProps<AfricaSvgProps>();

// Define the click event
const emit = defineEmits<{
  click: [id: string];
}>();

// Calculate the fill color based on selection
const fillColor = computed(() => {
  return props.isSelected ? '#4CAF50' : props.fill;
});

// Calculate the stroke color based on selection
const strokeColor = computed(() => {
  return props.isSelected ? '#2E7D32' : props.stroke;
});

// Create tooltip text with country name and innovation count
const tooltipText = computed(() => {
  const count = props.innovationCount || 0;
  const innovationText = count === 1 ? 'innovation' : 'innovations';
  return `${props.title}: ${count} ${innovationText}`;
});

const pathClass = computed(() =>
  props.clickable
    ? 'cursor-pointer hover:opacity-80 transition-all duration-200'
    : 'cursor-default'
);

// Handle click
const handleClick = () => {
  if (!props.clickable) return;
  emit('click', props.id);
};
</script>

<template>
  <path
    :isoCode="props.isoCode"
    :d="props.pathD"
    :title="tooltipText"
    :fill="fillColor"
    :stroke="strokeColor"
    :stroke-width="1"
    :id="props.id"
    :class="pathClass"
    @click="handleClick">
    <title>{{ tooltipText }}</title>
  </path>
</template>
