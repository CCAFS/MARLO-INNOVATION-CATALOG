<script setup lang="ts">
import { computed } from 'vue';
import { africaSvgPaths } from './AfricaSVGPaths';
import SvgCountry from './SvgCountry.vue';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';
import { useSharedValue } from './composables/useSharedValue';
import { useInnovations } from './composables/useInnovations';
import { getAmountByCountryFacets, getCountryColor, getCountryInnovationCount } from '~/utils/map/getAmountByCountry';
import { africaCountries } from './composables/useAfrica';

const { setValue, value } = useSharedValue();
const { apiFacets, apiTotalFacets } = useInnovations();

// Make getAmountByCountries reactive using computed
const getAmountByCountries = computed(() => getAmountByCountryFacets(apiFacets.value?.countries));

const getAmountTotalByCountries = computed(() => getAmountByCountryFacets(apiTotalFacets.value?.countries));

// Function to handle country selection
const toggleCountrySelection = (countryId: string) => {
  const filteredCount = getAmountByCountries.value
    ? getCountryInnovationCount(countryId, getAmountByCountries.value)
    : 0;
  if (filteredCount === 0) return;

  const currentCountries = value.value.countryIds || [];
  const countryIdNum = Number.parseInt(countryId);
  const index = currentCountries.indexOf(countryIdNum);

  if (index > -1) {
    // If already selected, remove it
    const updatedCountries = currentCountries.filter(id => id !== countryIdNum);
    setValue({
      countryIds: updatedCountries.length > 0 ? updatedCountries : undefined
    });
  } else {
    // If not selected, add it
    setValue({
      countryIds: [...currentCountries, countryIdNum]
    });
  }
};

// Function to check if a country is selected
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
    innovationCount: 0,
    clickable: false
  }));

  // Apply dynamic colors and innovation counts based on API data
  list.forEach(item => {
    // Get color based on innovation count for this country
    if (item.id) {
      const filteredCount = getCountryInnovationCount(item.id, getAmountByCountries.value);
      item.fill = getCountryColor(item.id, getAmountByCountries.value);
      item.clickable = filteredCount > 0;
      // Add innovation count to the country data
      const countryData = getAmountTotalByCountries.value.find(country => country.countryId === item.id);
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
      :clickable="country.clickable"
      :is-selected="isCountrySelected(country.id!)"
      @click="toggleCountrySelection(country.id!)" />
  </svg>
</template>
