<script setup lang="ts">
import { computed, ref } from 'vue';
import { africaSvgPaths } from './AfricaSVGPaths';
import SvgCountry from './SvgCountry.vue';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';
import { useSharedValue } from './composables/useSharedValue';
import { useInnovations } from './composables/useInnovations';
import { getAmountByCountry, getCountryColor } from '~/utils/map/getAmountByCountry';

// Estado reactivo para países seleccionados
const selectedCountries = ref<string[]>([]);

const { setValue, value } = useSharedValue();
const { apiDataForCountry } = useInnovations(); // Now uses the same singleton instance

// Make getAmountByCountries reactive using computed
const getAmountByCountries = computed(() => {
  if (!apiDataForCountry.value || !apiDataForCountry.value.innovations) {
    console.log('No API data available yet');
    return null;
  }
  console.log('Processing API data for map:', apiDataForCountry.value);
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

// Función para manejar la selección de países
const toggleCountrySelection = (countryId: string) => {
  const index = selectedCountries.value.indexOf(countryId);
  if (index > -1) {
    // Si ya está seleccionado, lo removemos
    setValue({
      countryIds: value.value.countryIds?.splice(index, 1)
    });
  } else {
    // Si no está seleccionado, lo agregamos
    setValue({
      countryIds: [...(value.value.countryIds || []), parseInt(countryId)]
    });
  }
};

// Función para verificar si un país está seleccionado
const isCountrySelected = (countryId: string): boolean => {
  return value.value.countryIds?.includes(parseInt(countryId)) || false;
};

const countryList = computed(() => {
  const list: AfricaSvgProps[] = [
    { id: '8', isoCode: 'AE', title: 'United Arab Emirates' },
    { id: '15', isoCode: 'AO', title: 'Angola' },
    { id: '27', isoCode: 'BF', title: 'Burkina Faso' },
    { id: '236', isoCode: 'ZA', title: 'South Africa' },
    { title: 'Bahrain', id: '29', isoCode: 'BH' },
    { title: 'Burundi', id: '30', isoCode: 'BI' },
    { title: 'Benin', id: '31', isoCode: 'BJ' },
    { title: 'Botswana', id: '39', isoCode: 'BW' },
    { title: 'Democratic Republic of Congo', id: '44', isoCode: 'CD' },
    { title: 'Central African Republic', id: '45', isoCode: 'CF' },
    { title: 'Republic of Congo', id: '659', isoCode: 'CG' },
    { title: "Côte d'Ivoire", id: '48', isoCode: 'CI' },
    { title: 'Cameroon', id: '51', isoCode: 'CM' },
    { title: 'Cape Verde', id: '56', isoCode: 'CV' },
    { title: 'Djibouti', id: '61', isoCode: 'DJ' },
    { title: 'Algeria', id: '65', isoCode: 'DZ' },
    { title: 'Egypt', id: '68', isoCode: 'EG' },
    { title: 'Western Sahara', id: '69', isoCode: 'EH' },
    { title: 'Eritrea', id: '70', isoCode: 'ER' },
    { title: 'Ethiopia', id: '72', isoCode: 'ET' },
    { title: 'Gabon', id: '79', isoCode: 'GA' },
    { title: 'Ghana', id: '83', isoCode: 'GH' },
    { title: 'Gibraltar', id: '84', isoCode: 'GI' },
    { title: 'Gambia', id: '86', isoCode: 'GM' },
    { title: 'Guinea', id: '87', isoCode: 'GN' },
    { title: 'Glorioso Islands', id: '', isoCode: 'GO' },
    { title: 'Equatorial Guinea', id: '88', isoCode: 'GQ' },
    { title: 'Guinea-Bissau', id: '92', isoCode: 'GW' },
    { title: 'Israel', id: '101', isoCode: 'IL' },
    { title: 'Iraq', id: '105', isoCode: 'IQ' },
    { title: 'Jordan', id: '111', isoCode: 'JO' },
    { title: 'Juan De Nova Island', id: '', isoCode: 'JU' },
    { title: 'Kenya', id: '113', isoCode: 'KE' },
    { title: 'Kiribati', id: '116', isoCode: 'KI' },
    { title: 'Comoros', id: '117', isoCode: 'KM' },
    { title: 'Kuwait', id: '121', isoCode: 'KW' },
    { title: 'Lebanon', id: '125', isoCode: 'LB' },
    { title: 'Liberia', id: '129', isoCode: 'LR' },
    { title: 'Lesotho', id: '130', isoCode: 'LS' },
    { title: 'Libya', id: '133', isoCode: 'LY' },
    { title: 'Morocco', id: '134', isoCode: 'MA' },
    { title: 'Madagascar', id: '139', isoCode: 'MG' },
    { title: 'Mali', id: '142', isoCode: 'ML' },
    { title: 'Mauritania', id: '147', isoCode: 'MR' },
    { title: 'Mauritius', id: '150', isoCode: 'MU' },
    { title: 'Malawi', id: '152', isoCode: 'MW' },
    { title: 'Mozambique', id: '155', isoCode: 'MZ' },
    { title: 'Namibia', id: '156', isoCode: 'NA' },
    { title: 'Niger', id: '158', isoCode: 'NE' },
    { title: 'Nigeria', id: '159', isoCode: 'NG' },
    { title: 'Oman', id: '167', isoCode: 'OM' },
    { title: 'Palestinian Territories', id: '830', isoCode: 'PS' },
    { title: 'Qatar', id: '181', isoCode: 'QA' },
    { title: 'Reunion', id: '681', isoCode: 'RE' },
    { title: 'Rwanda', id: '185', isoCode: 'RW' },
    { title: 'Saudi Arabia', id: '186', isoCode: 'SA' },
    { title: 'Seychelles', id: '188', isoCode: 'SC' },
    { title: 'Sudan', id: '189', isoCode: 'SD' },
    { title: 'Saint Helena', id: '192', isoCode: 'SH' },
    { title: 'Sierra Leone', id: '196', isoCode: 'SL' },
    { title: 'Senegal', id: '198', isoCode: 'SN' },
    { title: 'Somalia', id: '236', isoCode: 'SO' },
    { title: 'South Sudan', id: '687', isoCode: 'SS' },
    { title: 'Sao Tome and Principe', id: '201', isoCode: 'ST' },
    { title: 'Syria', id: '690', isoCode: 'SY' },
    { title: 'Swaziland', id: '204', isoCode: 'SZ' },
    { title: 'Chad', id: '206', isoCode: 'TD' },
    { title: 'Togo', id: '207', isoCode: 'TG' },
    { title: 'Tunisia', id: '213', isoCode: 'TN' },
    { title: 'Tanzania', id: '219', isoCode: 'TZ' },
    { title: 'Uganda', id: '221', isoCode: 'UG' },
    { title: 'Yemen', id: '234', isoCode: 'YE' },
    { title: 'Mayotte', id: '235', isoCode: 'YT' },
    { title: 'Zambia', id: '237', isoCode: 'ZM' },
    { title: 'Zimbabwe', id: '238', isoCode: 'ZW' }
  ];

  // Apply paths and dynamic colors based on innovation data
  list.forEach((item, index) => {
    item.pathD = africaSvgPaths[index];
    item.stroke = '#bababa';

    // Get color based on innovation count for this country
    if (getAmountByCountries.value && item.id) {
      item.fill = getCountryColor(item.id, getAmountByCountries.value);
    } else {
      item.fill = '#ffffff'; // Default white color
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
      :fill="country.fill"
      :stroke="country.stroke"
      :isoCode="country.isoCode"
      :is-selected="isCountrySelected(country.id!)"
      @click="toggleCountrySelection(country.id!)" />
  </svg>
</template>
