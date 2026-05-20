<script setup lang="ts">
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import Skeleton from 'primevue/skeleton';
import { computed, onMounted } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import { useFilterCatalog } from './composables/useFilterCatalog';
import { useFilterAvailability } from './composables/useFilterAvailability';
import { useInnovations } from './composables/useInnovations';
import { ACTOR_FILTER_OPTIONS, getActorFilterButtonStyle } from './constants/filterActors';
import HeaderSearch from '~/components/vue/HeaderSearch.vue';

import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog.interface';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';
import { texts } from '~/content/texts';

const { value, setValue, clearFilters } = useSharedValue();
const { clearSearch } = useInnovations();
const { isLoading: isCatalogLoading, loadCatalog } = useFilterCatalog();
const { sdgOptions, innovationTypeOptions, countryOptions } = useFilterAvailability();

const filterFieldWrapperClass = 'rounded-lg border border-border-light bg-white overflow-hidden';

const minimalSelectPt = {
  optionLabel: { class: 'overflow-hidden text-ellipsis whitespace-nowrap min-w-0' }
};

const multiSelectPt = {
  optionLabel: { class: 'overflow-hidden text-ellipsis whitespace-nowrap min-w-0' },
  labelContainer: { class: 'min-w-0 flex-1 overflow-hidden' }
};

const selectedInnovationType = computed(() => {
  if (value.value.innovationTypeId === null) return null;
  return innovationTypeOptions.value.find(type => type.id === value.value.innovationTypeId) || null;
});

const selectedSDG = computed(() => {
  if (value.value.sdgId === null) return null;
  return sdgOptions.value.find(sdg => sdg.id === value.value.sdgId) || null;
});

const selectedCountries = computed(() => {
  if (!value.value.countryIds || value.value.countryIds.length === 0) return [];
  return countryOptions.value.filter(country => value.value.countryIds?.includes(Number.parseInt(country.id)));
});

const isActorSelected = (actorName: string) => value.value.actorName?.includes(actorName) ?? false;

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

const handleClearFilters = () => {
  clearFilters();
  clearSearch();
};

onMounted(() => {
  loadCatalog();
});
</script>

<template>
  <div class="relative w-full flex flex-col gap-4">
    <div v-show="isCatalogLoading" class="absolute inset-0 z-10 flex flex-col gap-4 bg-white">
      <Skeleton width="100%" height="2.5rem" borderRadius="9999px" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Skeleton v-for="i in 3" :key="i" width="100%" height="2.5rem" borderRadius="0.5rem" />
      </div>
      <div class="flex flex-wrap gap-2">
        <Skeleton v-for="i in 6" :key="i" width="6rem" height="2rem" borderRadius="9999px" />
      </div>
    </div>

    <div :class="{ 'invisible pointer-events-none': isCatalogLoading }" class="flex flex-col gap-4">
      <HeaderSearch />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div :class="filterFieldWrapperClass">
          <Select
            id="innovation-typology"
            :modelValue="selectedInnovationType"
            @update:modelValue="handleSelectInnovationTypeChange"
            :options="innovationTypeOptions"
            optionLabel="name"
            optionDisabled="disabled"
            :placeholder="texts.home.innovationFilters.filters.innovationTypology.title"
            class="w-full border-0 shadow-none"
            size="small"
            showClear
            :pt="minimalSelectPt" />
        </div>

        <div :class="filterFieldWrapperClass">
          <MultiSelect
            id="countries"
            :modelValue="selectedCountries"
            @update:modelValue="handleSelectCountriesChange"
            :options="countryOptions"
            optionLabel="title"
            optionDisabled="disabled"
            :placeholder="texts.home.innovationFilters.filters.countries.title"
            class="w-full border-0 shadow-none"
            :fluid="false"
            :showToggleAll="false"
            size="small"
            showClear
            :maxSelectedLabels="2"
            :pt="multiSelectPt" />
        </div>

        <div :class="filterFieldWrapperClass">
          <Select
            id="sdg"
            :modelValue="selectedSDG"
            @update:modelValue="handleSelectSDGChange"
            :options="sdgOptions"
            optionLabel="shortName"
            optionDisabled="disabled"
            :placeholder="texts.home.innovationFilters.filters.sdgs.title"
            class="w-full border-0 shadow-none"
            size="small"
            showClear
            :pt="minimalSelectPt" />
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-text-600 font-medium shrink-0">{{ texts.home.innovationFilters.filters.actors.title }}</span>
        <button
          v-for="actor in ACTOR_FILTER_OPTIONS"
          :key="actor.id"
          type="button"
          class="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-opacity hover:opacity-90"
          :style="getActorFilterButtonStyle(actor, isActorSelected(actor.name))"
          @click="handleSelectActorsChange(actor.name)">
          {{ actor.shortLabel }}
        </button>
        <button type="button" class="text-xs text-gray-500 hover:text-gray-700 cursor-pointer px-2" @click="handleClearFilters">
          {{ texts.home.innovationFilters.filters.clearFilters }}
        </button>
      </div>
    </div>
  </div>
</template>
