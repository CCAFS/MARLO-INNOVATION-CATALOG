<script setup lang="ts">
import { computed } from 'vue';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';

const props = defineProps<AfricaSvgProps>();

// Definir el evento click
const emit = defineEmits<{
  click: [id: string];
}>();

// Calcular el color de relleno basado en si está seleccionado
const fillColor = computed(() => {
  return props.isSelected ? '#4CAF50' : props.fill;
});

// Calcular el color del borde basado en si está seleccionado
const strokeColor = computed(() => {
  return props.isSelected ? '#2E7D32' : props.stroke;
});

// Create tooltip text with country name and innovation count
const tooltipText = computed(() => {
  const count = props.innovationCount || 0;
  const innovationText = count === 1 ? 'innovation' : 'innovations';
  return `${props.title}: ${count} ${innovationText}`;
});

// Manejar el click
const handleClick = () => {
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
    class="cursor-pointer hover:opacity-80 transition-all duration-200"
    @click="handleClick">
    <title>{{ tooltipText }}</title>
  </path>
</template>
