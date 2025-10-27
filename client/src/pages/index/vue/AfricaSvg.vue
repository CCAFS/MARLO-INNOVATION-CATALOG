<script setup lang="ts">
import { computed } from 'vue';
import { africaSvgPaths } from './AfricaSVGPaths';
import SvgCountry from './SvgCountry.vue';

const countryList: any = computed(() => {
  const list = [
    {
      id: 'AE',
      title: 'United Arab Emirates',
      pathD: africaSvgPaths[0],
      fill: '#ff0000',
      stroke: '#ff0000'
    },
    {
      id: 'AO',
      title: 'Angola',
      pathD: africaSvgPaths[1],
      fill: '#ff0000',
      stroke: '#ff0000'
    },
    {
      id: 'BF',
      title: 'Burkina Faso',
      pathD: africaSvgPaths[2],
      fill: '#ff0000',
      stroke: '#ff0000'
    },
    {
      id: 'ZA',
      title: 'South Africa',
      pathD: africaSvgPaths[3],
      fill: '#16a34a',
      stroke: '#16a34a'
    },
    { title: 'Bahrain', id: 'BH' },
    { title: 'Burundi', id: 'BI' },
    { title: 'Benin', id: 'BJ' },
    { title: 'Botswana', id: 'BW' },
    { title: 'Democratic Republic of Congo', id: 'CD' },
    { title: 'Central African Republic', id: 'CF' },
    { title: 'Republic of Congo', id: 'CG' },
    { title: "Côte d'Ivoire", id: 'CI' },
    {
      title: 'Cameroon',
      id: 'CM'
    },
    { title: 'Cape Verde', id: 'CV' },
    { title: 'Djibouti', id: 'DJ' },
    { title: 'Algeria', id: 'DZ' },
    { title: 'Egypt', id: 'EG' },
    { title: 'Western Sahara', id: 'EH' },
    { title: 'Eritrea', id: 'ER' },
    { title: 'Ethiopia', id: 'ET' },
    { title: 'Gabon', id: 'GA' },
    { title: 'Ghana', id: 'GH' },
    { title: 'Gibraltar', id: 'GI' },
    { title: 'Gambia', id: 'GM' },
    { title: 'Guinea', id: 'GN' },
    { title: 'Glorioso Islands', id: 'GO' },
    { title: 'Equatorial Guinea', id: 'GQ' },
    { title: 'Guinea-Bissau', id: 'GW' },
    { title: 'Israel', id: 'IL' },
    { title: 'Iraq', id: 'IQ' },
    { title: 'Jordan', id: 'JO' },
    {
      title: 'Juan De Nova Island',
      id: 'JU'
    },
    { title: 'Kenya', id: 'KE' },
    { title: 'Kiribati', id: 'KI' },
    { title: 'Comoros', id: 'KM' },
    { title: 'Kuwait', id: 'KW' },
    { title: 'Lebanon', id: 'LB' },
    { title: 'Liberia', id: 'LR' },
    { title: 'Lesotho', id: 'LS' },
    { title: 'Libya', id: 'LY' },
    { title: 'Morocco', id: 'MA' },
    { title: 'Madagascar', id: 'MG' },
    { title: 'Mali', id: 'ML' },
    { title: 'Mauritania', id: 'MR' },
    { title: 'Mauritius', id: 'MU' },
    {
      title: 'Malawi',
      id: 'MW'
    },
    { title: 'Mozambique', id: 'MZ' },
    { title: 'Namibia', id: 'NA' },
    { title: 'Niger', id: 'NE' },
    { title: 'Nigeria', id: 'NG' },
    {
      title: 'Oman',
      id: 'OM'
    },
    { title: 'Palestinian Territories', id: 'PS' },
    { title: 'Qatar', id: 'QA' },
    { title: 'Reunion', id: 'RE' },
    { title: 'Rwanda', id: 'RW' },
    { title: 'Saudi Arabia', id: 'SA' },
    { title: 'Seychelles', id: 'SC' },
    { title: 'Sudan', id: 'SD' },
    { title: 'Saint Helena', id: 'SH' },
    {
      title: 'Sierra Leone',
      id: 'SL'
    },
    { title: 'Senegal', id: 'SN' },
    { title: 'Somalia', id: 'SO' },
    { title: 'South Sudan', id: 'SS' },
    { title: 'Sao Tome and Principe', id: 'ST' },
    { title: 'Syria', id: 'SY' },
    { title: 'Swaziland', id: 'SZ' },
    { title: 'Chad', id: 'TD' },
    { title: 'Togo', id: 'TG' },
    {
      title: 'Tunisia',
      id: 'TN'
    },
    { title: 'Tanzania', id: 'TZ' },
    { title: 'Uganda', id: 'UG' },
    { title: 'Yemen', id: 'YE' },
    { title: 'Mayotte', id: 'YT' },
    {
      title: 'Zambia',
      id: 'ZM'
    },
    { title: 'Zimbabwe', id: 'ZW' }
  ];

  list.map((item, index) => {
    item.pathD = africaSvgPaths[index];
    item.fill = '#ffffff';
    item.stroke = '#bababa';
  });

  return list;
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
      :stroke="country.stroke" />
  </svg>
</template>
