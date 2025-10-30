<script setup lang="ts">
import { computed, ref } from 'vue';
import { africaSvgPaths } from './AfricaSVGPaths';
import SvgCountry from './SvgCountry.vue';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';

// Estado reactivo para países seleccionados
const selectedCountries = ref<string[]>([]);

// Función para manejar la selección de países
const toggleCountrySelection = (countryId: string) => {
  const index = selectedCountries.value.indexOf(countryId);
  if (index > -1) {
    // Si ya está seleccionado, lo removemos
    selectedCountries.value.splice(index, 1);
  } else {
    // Si no está seleccionado, lo agregamos
    selectedCountries.value.push(countryId);
  }
};

// Función para verificar si un país está seleccionado
const isCountrySelected = (countryId: string): boolean => {
  return selectedCountries.value.includes(countryId);
};

const countryList = computed(() => {
  const list: AfricaSvgProps[] = [
    {
      id: '',
      isoCode: 'AE',
      title: 'United Arab Emirates'
    },
    {
      id: '',
      isoCode: 'AO',
      title: 'Angola'
    },
    {
      id: '',
      isoCode: 'BF',
      title: 'Burkina Faso'
    },
    {
      id: '',
      isoCode: 'ZA',
      title: 'South Africa'
    },
    { title: 'Bahrain', id: '', isoCode: 'BH' },
    { title: 'Burundi', id: '', isoCode: 'BI' },
    { title: 'Benin', id: '', isoCode: 'BJ' },
    { title: 'Botswana', id: '', isoCode: 'BW' },
    { title: 'Democratic Republic of Congo', id: '', isoCode: 'CD' },
    { title: 'Central African Republic', id: '', isoCode: 'CF' },
    { title: 'Republic of Congo', id: '', isoCode: 'CG' },
    { title: "Côte d'Ivoire", id: '', isoCode: 'CI' },
    {
      title: 'Cameroon',
      id: '',
      isoCode: 'CM'
    },
    { title: 'Cape Verde', id: '', isoCode: 'CV' },
    { title: 'Djibouti', id: '', isoCode: 'DJ' },
    { title: 'Algeria', id: '', isoCode: 'DZ' },
    { title: 'Egypt', id: '', isoCode: 'EG' },
    { title: 'Western Sahara', id: '', isoCode: 'EH' },
    { title: 'Eritrea', id: '', isoCode: 'ER' },
    { title: 'Ethiopia', id: '', isoCode: 'ET' },
    { title: 'Gabon', id: '', isoCode: 'GA' },
    { title: 'Ghana', id: '', isoCode: 'GH' },
    { title: 'Gibraltar', id: '', isoCode: 'GI' },
    { title: 'Gambia', id: '', isoCode: 'GM' },
    { title: 'Guinea', id: '', isoCode: 'GN' },
    { title: 'Glorioso Islands', id: '', isoCode: 'GO' },
    { title: 'Equatorial Guinea', id: '', isoCode: 'GQ' },
    { title: 'Guinea-Bissau', id: '', isoCode: 'GW' },
    { title: 'Israel', id: '', isoCode: 'IL' },
    { title: 'Iraq', id: '', isoCode: 'IQ' },
    { title: 'Jordan', id: '', isoCode: 'JO' },
    {
      title: 'Juan De Nova Island',
      id: '',
      isoCode: 'JU'
    },
    { title: 'Kenya', id: '', isoCode: 'KE' },
    { title: 'Kiribati', id: '', isoCode: 'KI' },
    { title: 'Comoros', id: '', isoCode: 'KM' },
    { title: 'Kuwait', id: '', isoCode: 'KW' },
    { title: 'Lebanon', id: '', isoCode: 'LB' },
    { title: 'Liberia', id: '', isoCode: 'LR' },
    { title: 'Lesotho', id: '', isoCode: 'LS' },
    { title: 'Libya', id: '', isoCode: 'LY' },
    { title: 'Morocco', id: '', isoCode: 'MA' },
    { title: 'Madagascar', id: '', isoCode: 'MG' },
    { title: 'Mali', id: '', isoCode: 'ML' },
    { title: 'Mauritania', id: '', isoCode: 'MR' },
    { title: 'Mauritius', id: '', isoCode: 'MU' },
    {
      title: 'Malawi',
      id: '',
      isoCode: 'MW'
    },
    { title: 'Mozambique', id: '', isoCode: 'MZ' },
    { title: 'Namibia', id: '', isoCode: 'NA' },
    { title: 'Niger', id: '', isoCode: 'NE' },
    { title: 'Nigeria', id: '', isoCode: 'NG' },
    {
      title: 'Oman',
      id: '',
      isoCode: 'OM'
    },
    { title: 'Palestinian Territories', id: '', isoCode: 'PS' },
    { title: 'Qatar', id: '', isoCode: 'QA' },
    { title: 'Reunion', id: '', isoCode: 'RE' },
    { title: 'Rwanda', id: '', isoCode: 'RW' },
    { title: 'Saudi Arabia', id: '', isoCode: 'SA' },
    { title: 'Seychelles', id: '', isoCode: 'SC' },
    { title: 'Sudan', id: '', isoCode: 'SD' },
    { title: 'Saint Helena', id: '', isoCode: 'SH' },
    {
      title: 'Sierra Leone',
      id: '',
      isoCode: 'SL'
    },
    { title: 'Senegal', id: '', isoCode: 'SN' },
    { title: 'Somalia', id: '', isoCode: 'SO' },
    { title: 'South Sudan', id: '', isoCode: 'SS' },
    { title: 'Sao Tome and Principe', id: '', isoCode: 'ST' },
    { title: 'Syria', id: '', isoCode: 'SY' },
    { title: 'Swaziland', id: '', isoCode: 'SZ' },
    { title: 'Chad', id: '', isoCode: 'TD' },
    { title: 'Togo', id: '', isoCode: 'TG' },
    {
      title: 'Tunisia',
      id: '',
      isoCode: 'TN'
    },
    { title: 'Tanzania', id: '', isoCode: 'TZ' },
    { title: 'Uganda', id: '', isoCode: 'UG' },
    { title: 'Yemen', id: '', isoCode: 'YE' },
    { title: 'Mayotte', id: '', isoCode: 'YT' },
    {
      title: 'Zambia',
      id: '',
      isoCode: 'ZM'
    },
    { title: 'Zimbabwe', id: '', isoCode: 'ZW' }
  ];

  list.map((item, index) => {
    item.pathD = africaSvgPaths[index];
    item.fill = '#ffffff';
    item.stroke = '#bababa';
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
      :is-selected="isCountrySelected(country.id!)"
      @click="toggleCountrySelection(country.id!)" />
  </svg>
</template>
