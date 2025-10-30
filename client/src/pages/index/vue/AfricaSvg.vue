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
      id: '1',
      isoCode: 'AE',
      title: 'United Arab Emirates'
    },
    {
      id: '2',
      isoCode: 'AO',
      title: 'Angola'
    },
    {
      id: '3',
      isoCode: 'BF',
      title: 'Burkina Faso'
    },
    {
      id: '4',
      isoCode: 'ZA',
      title: 'South Africa'
    },
    { title: 'Bahrain', id: '5', isoCode: 'BH' },
    { title: 'Burundi', id: '6', isoCode: 'BI' },
    { title: 'Benin', id: '7', isoCode: 'BJ' },
    { title: 'Botswana', id: '8', isoCode: 'BW' },
    { title: 'Democratic Republic of Congo', id: '9', isoCode: 'CD' },
    { title: 'Central African Republic', id: '10', isoCode: 'CF' },
    { title: 'Republic of Congo', id: '11', isoCode: 'CG' },
    { title: "Côte d'Ivoire", id: '12', isoCode: 'CI' },
    {
      title: 'Cameroon',
      id: '13',
      isoCode: 'CM'
    },
    { title: 'Cape Verde', id: '14', isoCode: 'CV' },
    { title: 'Djibouti', id: '15', isoCode: 'DJ' },
    { title: 'Algeria', id: '16', isoCode: 'DZ' },
    { title: 'Egypt', id: '17', isoCode: 'EG' },
    { title: 'Western Sahara', id: '18', isoCode: 'EH' },
    { title: 'Eritrea', id: '19', isoCode: 'ER' },
    { title: 'Ethiopia', id: '20', isoCode: 'ET' },
    { title: 'Gabon', id: '21', isoCode: 'GA' },
    { title: 'Ghana', id: '22', isoCode: 'GH' },
    { title: 'Gibraltar', id: '23', isoCode: 'GI' },
    { title: 'Gambia', id: '24', isoCode: 'GM' },
    { title: 'Guinea', id: '25', isoCode: 'GN' },
    { title: 'Glorioso Islands', id: '26', isoCode: 'GO' },
    { title: 'Equatorial Guinea', id: '27', isoCode: 'GQ' },
    { title: 'Guinea-Bissau', id: '28', isoCode: 'GW' },
    { title: 'Israel', id: '29', isoCode: 'IL' },
    { title: 'Iraq', id: '30', isoCode: 'IQ' },
    { title: 'Jordan', id: '31', isoCode: 'JO' },
    {
      title: 'Juan De Nova Island',
      id: '32',
      isoCode: 'JU'
    },
    { title: 'Kenya', id: '33', isoCode: 'KE' },
    { title: 'Kiribati', id: '34', isoCode: 'KI' },
    { title: 'Comoros', id: '35', isoCode: 'KM' },
    { title: 'Kuwait', id: '36', isoCode: 'KW' },
    { title: 'Lebanon', id: '37', isoCode: 'LB' },
    { title: 'Liberia', id: '38', isoCode: 'LR' },
    { title: 'Lesotho', id: '39', isoCode: 'LS' },
    { title: 'Libya', id: '40', isoCode: 'LY' },
    { title: 'Morocco', id: '41', isoCode: 'MA' },
    { title: 'Madagascar', id: '42', isoCode: 'MG' },
    { title: 'Mali', id: '43', isoCode: 'ML' },
    { title: 'Mauritania', id: '44', isoCode: 'MR' },
    { title: 'Mauritius', id: '45', isoCode: 'MU' },
    {
      title: 'Malawi',
      id: '46',
      isoCode: 'MW'
    },
    { title: 'Mozambique', id: '47', isoCode: 'MZ' },
    { title: 'Namibia', id: '48', isoCode: 'NA' },
    { title: 'Niger', id: '49', isoCode: 'NE' },
    { title: 'Nigeria', id: '50', isoCode: 'NG' },
    {
      title: 'Oman',
      id: '51',
      isoCode: 'OM'
    },
    { title: 'Palestinian Territories', id: '52', isoCode: 'PS' },
    { title: 'Qatar', id: '53', isoCode: 'QA' },
    { title: 'Reunion', id: '54', isoCode: 'RE' },
    { title: 'Rwanda', id: '55', isoCode: 'RW' },
    { title: 'Saudi Arabia', id: '56', isoCode: 'SA' },
    { title: 'Seychelles', id: '57', isoCode: 'SC' },
    { title: 'Sudan', id: '58', isoCode: 'SD' },
    { title: 'Saint Helena', id: '59', isoCode: 'SH' },
    {
      title: 'Sierra Leone',
      id: '60',
      isoCode: 'SL'
    },
    { title: 'Senegal', id: '61', isoCode: 'SN' },
    { title: 'Somalia', id: '62', isoCode: 'SO' },
    { title: 'South Sudan', id: '63', isoCode: 'SS' },
    { title: 'Sao Tome and Principe', id: '64', isoCode: 'ST' },
    { title: 'Syria', id: '65', isoCode: 'SY' },
    { title: 'Swaziland', id: '66', isoCode: 'SZ' },
    { title: 'Chad', id: '67', isoCode: 'TD' },
    { title: 'Togo', id: '68', isoCode: 'TG' },
    {
      title: 'Tunisia',
      id: '69',
      isoCode: 'TN'
    },
    { title: 'Tanzania', id: '70', isoCode: 'TZ' },
    { title: 'Uganda', id: '71', isoCode: 'UG' },
    { title: 'Yemen', id: '72', isoCode: 'YE' },
    { title: 'Mayotte', id: '73', isoCode: 'YT' },
    {
      title: 'Zambia',
      id: '74',
      isoCode: 'ZM'
    },
    { title: 'Zimbabwe', id: '75', isoCode: 'ZW' }
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
      :isoCode="country.isoCode"
      :is-selected="isCountrySelected(country.id!)"
      @click="toggleCountrySelection(country.id!)" />
  </svg>
</template>
