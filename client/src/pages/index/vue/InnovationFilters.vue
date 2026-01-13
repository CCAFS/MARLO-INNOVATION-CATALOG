<script setup lang="ts">
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import { computed, onMounted, ref } from 'vue';
import { FilterType, useSharedValue } from './composables/useSharedValue';

import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog.interface';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';

import { useApi } from '~/composables/database-api/useApi';

import { Banks, Farmers, Agricultural, Researchers, Policy, Others } from '~/images/actors-icons';
import { africaCountries } from './composables/useAfrica';
import { useInnovations } from './composables/useInnovations';

import areAnyInnovationsAssociatedWithFilterOption from '~/utils/filters/areAnyInnovationsAssociatedWithFilterOption';
import { texts } from '~/content/texts';

const { value, setValue, clearFilters } = useSharedValue();

const { onSearchActive, onSearchDeactive, handleSearch } = useInnovations();

// Exchange between filters and search
const isFiltersActive = ref<boolean>(true);

//Provsional Array for Actors Type Chips
const actorsType = ref<Array<{ id: number; name: string; color: string; imgUrl: any }>>([
  { id: 1, name: 'Banks/Investors', color: '#FF6242', imgUrl: Banks },
  { id: 2, name: 'Farmers/(agro)pastoralist/heders/fishers', color: '#84AC58', imgUrl: Farmers },
  { id: 3, name: 'Agricultural extensions agents', color: '#FF8A14', imgUrl: Agricultural },
  { id: 4, name: 'Researchers', color: '#89AE57', imgUrl: Researchers },
  { id: 5, name: 'Policy actors (public or private)', color: '#85B1CD', imgUrl: Policy },
  { id: 6, name: 'Other', color: '#214994', imgUrl: Others }
]);

const dataSDGs = ref<SdgResume[]>([]);
const dataInnovationTypes = ref<InnovationType[]>([]);
const dataCountries = ref<AfricaSvgProps[]>([]);

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
  setValue({
    innovationTypeId: newValue?.id || null
  });
};

const handleSelectSDGChange = (newValue: SdgResume | null) => {
  setValue({
    sdgId: newValue?.id || null
  });
};

const handleSelectCountriesChange = (newValue: AfricaSvgProps[] | null) => {
  const countryIds = newValue?.map(country => Number.parseInt(country.id)) || [];
  setValue({
    countryIds: countryIds.length > 0 ? countryIds : null
  });
};

const handleSelectActorsChange = (btnName: string, newValue: string[] | null) => {
  const element = document.getElementsByName(btnName)[0] as HTMLElement;

  const actorNamesValue = value.value.actorName || [];
  const isAlreadySelected = newValue?.some(actor => actorNamesValue.includes(actor));
  if (isAlreadySelected) {
    // Remove actor if already selected
    const updatedActorNames = actorNamesValue.filter(actor => !newValue?.includes(actor));
    setValue({
      actorName: updatedActorNames.length > 0 ? updatedActorNames : null
    });

    element.classList.add('opacity-50');
  } else {
    // Add new actors
    const updatedActorNames = [...actorNamesValue, ...(newValue || [])];
    setValue({
      actorName: updatedActorNames.length > 0 ? updatedActorNames : null
    });

    element.classList.remove('opacity-50');
  }
};

// Method to change if isFilterActive
const toggleFilterActive = () => {
  if (isFiltersActive.value) {
    isFiltersActive.value = false;
    clearFilters();
    onSearchActive(value.value);
  } else {
    isFiltersActive.value = true;
    clearFilters();
    onSearchDeactive(value.value);
  }
};

// Compose clearFilter method due to actors filter
const composeClearFilters = () => {
  clearFilters();

  // Reset opacity of all actor buttons
  actorsType.value.forEach(actor => {
    const element = document.getElementsByName(actor.name)[0] as HTMLElement;
    if (element) {
      element.classList.add('opacity-50');
    }
  });
};

// Initial data fetch

onMounted(async () => {
  await Promise.all([fetchSGDsData(), fetchInnovationsTypeData()])
    .then(() => {
      // Data fetched
      dataCountries.value = africaCountries;
      clearFilters();
    })
    .finally(() => {
      // Final actions if needed
      // FSet disabled options if there it's no innovation associated
      setTimeout(async () => {
        dataSDGs.value = dataSDGs.value.map(sdg => ({
          ...sdg,
          disabled: !areAnyInnovationsAssociatedWithFilterOption(FilterType.SdgId, sdg.id)
        }));

        dataInnovationTypes.value = dataInnovationTypes.value.map(type => ({
          ...type,
          disabled: !areAnyInnovationsAssociatedWithFilterOption(FilterType.InnovationTypeId, type.id)
        }));

        dataCountries.value = dataCountries.value.map(country => ({
          ...country,
          disabled: !areAnyInnovationsAssociatedWithFilterOption(FilterType.CountryIds, Number.parseInt(country.id))
        }));
      }, 2000);
    });
});
</script>

<template>
  <div class="relative overflow-hidden h-full" :class="isFiltersActive ? 'lg:h-42 xl:h-46' : 'lg:h-24 xl:h-28'">
    <Transition name="slide-right">
      <div v-if="isFiltersActive" class="container mx-auto px-4 lg:mt-4 lg:px-4 xl:px-12 2xl:px-16">
        <!-- Selector Filters (Country,SDGs & Innovation typology) -->
        <div class="flex flex-col flex-wrap lg:flex-nowrap lg:flex-row items-end gap-2 w-full lg:gap-4 mb-4">
          <!-- Filters -->
          <div class="flex flex-col gap-3 w-full lg:flex-row lg:gap-2">
            <!-- Innovation typology - Mobile: full width | Desktop (lg+): 58% width -->
            <div class="flex flex-col gap-2 w-full">
              <label for="innovation-typology" class="font-bold text-xs xl:text-sm 2xl:text-base">{{ texts.home.innovationFilters.filters.innovationTypology.title }}</label>
              <Select
                id="innovation-typology"
                :modelValue="selectedInnovationType"
                @update:modelValue="handleSelectInnovationTypeChange"
                :options="dataInnovationTypes"
                optionLabel="name"
                optionDisabled="disabled"
                :placeholder="texts.home.innovationFilters.filters.innovationTypology.placeholder"
                :fluid="false"
                class="w-full"
                size="small"
                :pt="{
                  root: { class: '!bg-transparent !border-black' },
                  input: { class: '!bg-transparent !border-black' },
                  overlay: { class: 'w-0' },
                  optionLabel: { class: 'overflow-hidden text-ellipsis whitespace-nowrap min-w-0' },
                  label: { class: '!w-0 overflow-hidden text-ellipsis whitespace-nowrap' }
                }" />
            </div>

            <!-- Countries - Multiselect - Mobile: full width | Desktop (lg+): 35% width -->
            <div class="flex flex-col gap-2 w-full">
              <label for="countries" class="font-bold text-xs xl:text-sm 2xl:text-base">{{ texts.home.innovationFilters.filters.countries.title }}</label>
              <MultiSelect
                id="countries"
                :modelValue="selectedCountries"
                @update:modelValue="handleSelectCountriesChange"
                :options="dataCountries"
                optionLabel="title"
                optionDisabled="disabled"
                :placeholder="texts.home.innovationFilters.filters.countries.placeholder"
                class="w-full"
                :fluid="false"
                :showToggleAll="false"
                size="small"
                :showClear="false"
                :maxSelectedLabels="2"
                :pt="{
                  root: { class: '!bg-transparent !border-black' },
                  input: { class: '!bg-transparent !border-black' },
                  overlay: { class: 'w-0' },
                  optionLabel: { class: 'overflow-hidden text-ellipsis min-w-0' },
                  labelContainer: { class: 'w-0 overflow-hidden text-ellipsis' }
                }" />
            </div>

            <!-- SDG - Mobile: full width | Desktop (lg+): 35% width -->
            <div class="flex flex-col gap-2 w-full">
              <label for="sdg" class="font-bold text-xs xl:text-sm 2xl:text-base">{{ texts.home.innovationFilters.filters.sdgs.title }}</label>
              <Select
                id="sdg"
                :modelValue="selectedSDG"
                @update:modelValue="handleSelectSDGChange"
                :options="dataSDGs"
                optionLabel="shortName"
                optionDisabled="disabled"
                :placeholder="texts.home.innovationFilters.filters.sdgs.placeholder"
                class="w-full"
                :fluid="false"
                size="small"
                :pt="{
                  root: { class: '!bg-transparent !border-black' },
                  input: { class: '!bg-transparent !border-black' },
                  overlay: { class: 'w-0' },
                  optionLabel: { class: 'overflow-hidden text-ellipsis min-w-0' },
                  label: { class: '!w-0 overflow-hidden text-ellipsis whitespace-nowrap' }
                }" />
            </div>
          </div>
          <!-- Clear button - Mobile: centrado | Desktop (lg+): flex-auto original -->
          <div class="flex items-center w-full lg:w-auto justify-center lg:flex-auto lg:justify-start">
            <button
              class="bg-transparent text-gray-700 w-max h-8 p-4 text-xs rounded-sm hover:bg-gray-700 hover:text-white lg:p-2 cursor-pointer"
              @click="composeClearFilters">
              {{ texts.home.innovationFilters.filters.clearFilters }}
            </button>
          </div>

          <hr class="border-l hidden lg:block border-gray-700 h-8" />

          <!-- Button - Change state -->
          <button
            class="border border-gray-700 h-8.5 w-8.5 rounded-sm hover:bg-text-600 hover:text-white pi pi-search p-2 cursor-pointer order-first lg:order-none"
            @click="toggleFilterActive"></button>
        </div>

        <hr class="border-l border-gray-700 h-[1px] w-full mb-2" />

        <label for="actors-container" class="w-[100%] font-bold text-xs xl:text-sm 2xl:text-base">{{ texts.home.innovationFilters.filters.actors.title }}</label>

        <!-- Chip selectors for actors typology -->
        <div id="actors-container" class="w-full flex flex-row flex-wrap justify-between lg:flex-nowrap gap-2 pb-2 overflow-hidden">
          <button
            v-for="actor in actorsType"
            :key="actor.id"
            :name="actor.name"
            @click="handleSelectActorsChange(actor.name, [actor.name])"
            class="px-3 py-2 rounded-full text-xs w-48 lg:w-1/6 font-medium cursor-pointer flex items-center justify-between opacity-50"
            :style="{ backgroundColor: actor.color, color: '#FFF' }">
            <span class="text-ellipsis whitespace-nowrap line-clamp-1 w-5/6">{{ actor.name }}</span>
            <component
              :is="actor.imgUrl"
              viewBox="0 0 863 863"
              height="20"
              width="20"
              class="w-5 h-5 [&_path]:fill-white [&_path]:stroke-white [&_g]:stroke-white [&_g_path]:fill-white" />
          </button>
        </div>
      </div>

      <!-- Search visual active -->
      <div
        v-else
        class="container mx-auto px-4 lg:mt-4 lg:px-4 xl:px-12 2xl:px-16 flex flex-col gap-2 items-end w-full lg:flex-row lg:flex-none lg:gap-4">
        <!-- Button - Change state -->
        <button
          class="border border-gray-700 h-8.5 w-8.5 rounded-sm hover:bg-text-600 hover:text-white pi pi-bars p-2 cursor-pointer"
          @click="toggleFilterActive"></button>

        <div class="border-l hidden lg:block border-gray-700 h-8"></div>

        <!-- Search -->
        <div class="flex flex-col gap-2 w-full">
          <label for="search-input" class="font-bold text-xs xl:text-sm 2xl:text-base">{{ texts.home.innovationFilters.search.title }}</label>
          <InputText
            id="search-input"
            type="text"
            :placeholder="texts.home.innovationFilters.search.placeholder"
            size="small"
            @input="(e) => handleSearch((e.target as HTMLInputElement).value)"
            class="w-full border rounded-md px-3 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400"
            :pt="{ root: { class: '!bg-transparent !border-gray-700' }, input: { class: '!bg-transparent !border-gray-700' } }" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
  position: absolute;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
