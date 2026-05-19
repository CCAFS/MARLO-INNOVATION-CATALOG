<script setup lang="ts">
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import Skeleton from 'primevue/skeleton';
import { computed, onMounted, ref, watch } from 'vue';
import { FilterType, useSharedValue } from './composables/useSharedValue';

import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog.interface';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';

import { useApi } from '~/composables/database-api/useApi';
import { africaCountries } from './composables/useAfrica';
import { useInnovations } from './composables/useInnovations';

import areAnyInnovationsAssociatedWithFilterOption from '~/utils/filters/areAnyInnovationsAssociatedWithFilterOption';
import { texts } from '~/content/texts';

const { value, setValue, clearFilters } = useSharedValue();
const { apiDataTotal } = useInnovations();

const isLoading = ref<boolean>(true);

const actorsType = ref<Array<{ id: number; name: string; shortLabel: string }>>([
  { id: 1, name: 'Banks/Investors', shortLabel: 'Banks/Investors' },
  { id: 2, name: 'Farmers/(agro)pastoralist/heders/fishers', shortLabel: 'Farmers' },
  { id: 3, name: 'Agricultural extensions agents', shortLabel: 'Extension agents' },
  { id: 4, name: 'Researchers', shortLabel: 'Researchers' },
  { id: 5, name: 'Policy actors (public or private)', shortLabel: 'Policy actors' },
  { id: 6, name: 'Other', shortLabel: 'Other' }
]);

const dataSDGs = ref<SdgResume[]>([]);
const dataInnovationTypes = ref<InnovationType[]>([]);
const dataCountries = ref<AfricaSvgProps[]>([]);

const selectPt = {
  root: { class: '!bg-white !border-border-light !rounded-lg' },
  input: { class: '!bg-white' },
  overlay: { class: 'w-0' },
  optionLabel: { class: 'overflow-hidden text-ellipsis whitespace-nowrap min-w-0' },
  label: { class: '!w-0 overflow-hidden text-ellipsis whitespace-nowrap' }
};

const selectedInnovationType = computed(() => {
  if (value.value.innovationTypeId === null) return null;
  return dataInnovationTypes.value.find(type => type.id === value.value.innovationTypeId) || null;
});

const selectedSDG = computed(() => {
  if (value.value.sdgId === null) return null;
  return dataSDGs.value.find(sdg => sdg.id === value.value.sdgId) || null;
});

const selectedCountries = computed(() => {
  if (!value.value.countryIds || value.value.countryIds.length === 0) return [];
  return dataCountries.value.filter(country => value.value.countryIds?.includes(Number.parseInt(country.id)));
});

const isActorSelected = (actorName: string) => value.value.actorName?.includes(actorName) ?? false;

const fetchSGDsData = async () => {
  try {
    const { getSustainableDevelopmentGoals } = useApi();
    const response = await getSustainableDevelopmentGoals();
    dataSDGs.value = response;
  } catch (error) {
    console.error('Error fetching SDGs data:', error);
  }
};

const fetchInnovationsTypeData = async () => {
  try {
    const { getInnovationTypes } = useApi();
    const response = await getInnovationTypes();
    dataInnovationTypes.value = response;
  } catch (error) {
    console.error('Error fetching Innovation Types data:', error);
  }
};

const handleSelectInnovationTypeChange = (newValue: InnovationType | null) => {
  setValue({ innovationTypeId: newValue?.id || null });
};

const handleSelectSDGChange = (newValue: SdgResume | null) => {
  setValue({ sdgId: newValue?.id || null });
};

const handleSelectCountriesChange = (newValue: AfricaSvgProps[] | null) => {
  const countryIds = newValue?.map(country => Number.parseInt(country.id)) || [];
  setValue({ countryIds: countryIds.length > 0 ? countryIds : null });
};

const handleSelectActorsChange = (actorName: string) => {
  const actorNamesValue = value.value.actorName || [];
  const isAlreadySelected = actorNamesValue.includes(actorName);

  if (isAlreadySelected) {
    const updatedActorNames = actorNamesValue.filter(actor => actor !== actorName);
    setValue({ actorName: updatedActorNames.length > 0 ? updatedActorNames : null });
  } else {
    setValue({ actorName: [...actorNamesValue, actorName] });
  }
};

const composeClearFilters = () => {
  clearFilters();
};

const setDisabledOptions = () => {
  dataSDGs.value = dataSDGs.value
    .map(sdg => ({
      ...sdg,
      disabled: !areAnyInnovationsAssociatedWithFilterOption(FilterType.SdgId, sdg.id)
    }))
    .sort((a, b) => (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1));

  dataInnovationTypes.value = dataInnovationTypes.value
    .map(type => ({
      ...type,
      disabled: !areAnyInnovationsAssociatedWithFilterOption(FilterType.InnovationTypeId, type.id)
    }))
    .sort((a, b) => (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1));

  dataCountries.value = dataCountries.value
    .map(country => ({
      ...country,
      disabled: !areAnyInnovationsAssociatedWithFilterOption(FilterType.CountryIds, Number.parseInt(country.id))
    }))
    .sort((a, b) => (a.disabled === b.disabled ? 0 : a.disabled ? 1 : -1));

  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchSGDsData(), fetchInnovationsTypeData()])
    .then(() => {
      dataCountries.value = africaCountries;
      clearFilters();
    })
    .catch(error => {
      console.error('Error fetching filter data:', error);
      isLoading.value = false;
    });
});

watch(
  () => apiDataTotal.value,
  newValue => {
    if (newValue && newValue.totalCount > 0) {
      setDisabledOptions();
    } else if (newValue && newValue.totalCount === 0) {
      isLoading.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="w-full">
    <div v-if="isLoading" class="flex flex-col gap-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Skeleton v-for="i in 3" :key="i" width="100%" height="2.5rem" borderRadius="0.5rem" />
      </div>
      <div class="flex flex-wrap gap-2">
        <Skeleton v-for="i in 6" :key="i" width="6rem" height="2rem" borderRadius="9999px" />
      </div>
    </div>

    <div v-show="!isLoading" class="flex flex-col gap-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Select
          id="innovation-typology"
          :modelValue="selectedInnovationType"
          @update:modelValue="handleSelectInnovationTypeChange"
          :options="dataInnovationTypes"
          optionLabel="name"
          optionDisabled="disabled"
          :placeholder="texts.home.innovationFilters.filters.innovationTypology.title"
          class="w-full"
          size="small"
          :pt="selectPt" />

        <MultiSelect
          id="countries"
          :modelValue="selectedCountries"
          @update:modelValue="handleSelectCountriesChange"
          :options="dataCountries"
          optionLabel="title"
          optionDisabled="disabled"
          :placeholder="texts.home.innovationFilters.filters.countries.title"
          class="w-full"
          :fluid="false"
          :showToggleAll="false"
          size="small"
          :showClear="false"
          :maxSelectedLabels="2"
          :pt="selectPt" />

        <Select
          id="sdg"
          :modelValue="selectedSDG"
          @update:modelValue="handleSelectSDGChange"
          :options="dataSDGs"
          optionLabel="shortName"
          optionDisabled="disabled"
          :placeholder="texts.home.innovationFilters.filters.sdgs.title"
          class="w-full"
          size="small"
          :pt="selectPt" />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-text-600 font-medium shrink-0">{{ texts.home.innovationFilters.filters.actors.title }}</span>
        <button
          v-for="actor in actorsType"
          :key="actor.id"
          type="button"
          @click="handleSelectActorsChange(actor.name)"
          class="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-colors"
          :class="
            isActorSelected(actor.name) ? 'bg-gray-300 text-gray-900 border-gray-400' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
          ">
          {{ actor.shortLabel }}
        </button>
        <button type="button" class="text-xs text-gray-500 hover:text-gray-700 cursor-pointer px-2" @click="composeClearFilters">
          {{ texts.home.innovationFilters.filters.clearFilters }}
        </button>
      </div>
    </div>
  </div>
</template>
