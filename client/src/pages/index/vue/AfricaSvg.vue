<script setup lang="ts">
import { computed } from 'vue';
import { africaSvgPaths } from './AfricaSVGPaths';
import SvgCountry from './SvgCountry.vue';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';
import { useSharedValue } from './composables/useSharedValue';
import { useInnovations } from './composables/useInnovations';
import { getAmountByCountry, getCountryColor } from '~/utils/map/getAmountByCountry';
import { africaCountries } from './composables/useAfrica';

const { setValue, value } = useSharedValue();
const { apiDataForCountry, apiDataTotal } = useInnovations(); // Now uses the same singleton instance

// Make getAmountByCountries reactive using computed
const getAmountByCountries = computed(() => {
  if (!apiDataForCountry.value || !apiDataForCountry.value.innovations) {
    console.log('No API data available yet');
    return null;
  }
  // Create a deep mutable copy of the readonly data
  const mutableData = {
    ...apiDataForCountry.value,
    innovations: apiDataForCountry.value.innovations.map(innovation => ({
      ...innovation,
      sdgs: [...innovation.sdgs],
      countries: [...innovation.countries],
      regions: [...innovation.regions]
    }))
  };
  return getAmountByCountry(mutableData);
});

const getAmountTotalByCountries = computed(() => {
  if (!apiDataTotal.value || !apiDataTotal.value.innovations) {
    console.log('No total API data available yet');
    return null;
  }
  // Create a deep mutable copy of the readonly data
  const mutableData = {
    ...apiDataTotal.value,
    innovations: apiDataTotal.value.innovations.map(innovation => ({
      ...innovation,
      sdgs: [...innovation.sdgs],
      countries: [...innovation.countries],
      regions: [...innovation.regions]
    }))
  };
  return getAmountByCountry(mutableData);
});

// Función para manejar la selección de países
const toggleCountrySelection = (countryId: string) => {
  const currentCountries = value.value.countryIds || [];
  const countryIdNum = Number.parseInt(countryId);
  const index = currentCountries.indexOf(countryIdNum);

  if (index > -1) {
    // Si ya está seleccionado, lo removemos
    const updatedCountries = currentCountries.filter(id => id !== countryIdNum);
    setValue({
      countryIds: updatedCountries.length > 0 ? updatedCountries : undefined
    });
  } else {
    // Si no está seleccionado, lo agregamos
    setValue({
      countryIds: [...currentCountries, countryIdNum]
    });
  }
};

// Función para verificar si un país está seleccionado
const isCountrySelected = (countryId: string): boolean => {
  return value.value.countryIds?.includes(Number.parseInt(countryId)) || false;
};

const countryList = computed(() => {
  // Create a new array with shallow copies to ensure reactivity
  const list: AfricaSvgProps[] = africaCountries.map((country, index) => ({
    ...country,
    pathD: africaSvgPaths[index],
    stroke: '#bababa',
    fill: '#ffffff',
    innovationCount: 0
  }));

  // Apply dynamic colors and innovation counts based on API data
  list.forEach(item => {
    // Get color based on innovation count for this country
    if (getAmountByCountries.value && item.id) {
      item.fill = getCountryColor(item.id, getAmountByCountries.value);
      // Add innovation count to the country data
      const countryData = getAmountTotalByCountries.value?.find(country => country.countryId === item.id);
      item.innovationCount = countryData ? countryData.innovationCount : 0;
    }
  });

  return list as AfricaSvgProps[];
});
</script>

<template>
  <svg x="-20" y="65" viewBox="0 0 250 310" id="savage" version="1.1">
    <defs id="defs261" />

    <SvgCountry
      v-for="(country, index) in countryList"
      :key="index"
      :id="country.id"
      :title="country.title"
      :pathD="country.pathD"
      :fill="getAmountByCountries ? country.fill : '#e0e0e0'"
      :stroke="country.stroke"
      :isoCode="country.isoCode"
      :innovation-count="country.innovationCount"
      :is-selected="isCountrySelected(country.id!)"
      @click="toggleCountrySelection(country.id!)" />
  </svg>
</template>
