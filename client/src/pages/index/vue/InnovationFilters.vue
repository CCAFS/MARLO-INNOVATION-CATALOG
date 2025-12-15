<script setup lang="ts">
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import { computed, onMounted, ref } from 'vue';
import { useSharedValue } from './composables/useSharedValue';

import type { InnovationType, SdgResume } from '~/interfaces/innovation-catalog-v2.interface';
import { useApi } from '~/composables/database-api/useApi';

import { Banks, Farmers, Agricultural, Researchers, Policy, Others } from '~/images/actors-icons';
import type { AfricaSvgProps } from '~/interfaces/africa-svg-props.interface';
import { africaCountries } from './composables/useAfrica';

const { value, setValue, clearFilters } = useSharedValue();

// Exchange between filters and search
const isFiltersActive = ref<boolean>(true);

//Provsional Array for Actors Type Chips
const actorsType = ref<Array<{ id: number; name: string; color: string; imgUrl: any }>>([
  { id: 1, name: 'Bank/Investors', color: '#FF6242', imgUrl: Banks },
  { id: 2, name: 'Farmers/(agro)pastoralist/heders/fishers', color: '#84AC58', imgUrl: Farmers },
  { id: 3, name: 'Agricultural extension agents', color: '#FF8A14', imgUrl: Agricultural },
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

    return;
  } else {
    // Add new actors
    const updatedActorNames = [...actorNamesValue, ...(newValue || [])];
    setValue({
      actorName: updatedActorNames.length > 0 ? updatedActorNames : null
    });

    element.classList.remove('opacity-50');
    return;
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

onMounted(() => {
  fetchSGDsData();
  fetchInnovationsTypeData();
  dataCountries.value = africaCountries;
  clearFilters();
});
</script>

<template>
  <div class="relative overflow-hidden h-42">
    <Transition name="slide-right">
      <div v-if="isFiltersActive" class="container mx-auto mt-6 px-4 lg:mt-10 lg:p-0 xl:px-16 2xl:px-20">
        <!-- Selector Filters (Country,SDGs & Innovation typology) -->
        <div class="flex flex-row items-end gap-2 w-full lg:gap-4 mb-4">
          <!-- Filters -->
          <div class="flex flex-col gap-3 w-full lg:flex-row lg:gap-2">
            <!-- Innovation typology - Mobile: full width | Desktop (lg+): 58% width -->
            <div class="flex flex-col gap-2 w-full">
              <label class="font-bold text-xs xl:text-sm 2xl:text-base">Innovation typology</label>
              <Select
                :modelValue="selectedInnovationType"
                @update:modelValue="handleSelectInnovationTypeChange"
                :options="dataInnovationTypes"
                optionLabel="name"
                placeholder="All"
                class="w-full"
                size="small"
                :pt="{ root: { class: '!bg-transparent !border-black' }, input: { class: '!bg-transparent !border-black' } }" />
            </div>

            <!-- Countries - Multiselect - Mobile: full width | Desktop (lg+): 35% width -->
            <div class="flex flex-col gap-2 w-full">
              <label class="font-bold text-xs xl:text-sm 2xl:text-base">Countries</label>
              <MultiSelect
                :modelValue="selectedCountries"
                @update:modelValue="handleSelectCountriesChange"
                :options="dataCountries"
                optionLabel="title"
                placeholder="All"
                class="w-full"
                size="small"
                :pt="{ root: { class: '!bg-transparent !border-black' }, input: { class: '!bg-transparent !border-black' } }" />
            </div>

            <!-- SDG - Mobile: full width | Desktop (lg+): 35% width -->
            <div class="flex flex-col gap-2 w-full">
              <label class="font-bold text-xs xl:text-sm 2xl:text-base">SDG</label>
              <Select
                :modelValue="selectedSDG"
                @update:modelValue="handleSelectSDGChange"
                :options="dataSDGs"
                optionLabel="shortName"
                placeholder="All"
                class="w-full"
                size="small"
                :pt="{ root: { class: '!bg-transparent !border-black' }, input: { class: '!bg-transparent !border-black' } }" />
            </div>
          </div>
          <!-- Clear button - Mobile: centrado | Desktop (lg+): flex-auto original -->
          <div class="flex items-center justify-center lg:flex-auto lg:justify-start">
            <button
              class="bg-transparent text-gray-700 w-max h-8 p-4 text-xs rounded-sm hover:bg-gray-700 hover:text-white lg:p-2 cursor-pointer"
              @click="composeClearFilters">
              Clear Filters
            </button>
          </div>

          <hr class="border-l border-gray-700 h-8" />

          <!-- Button - Change state -->
          <button
            class="border border-gray-700 h-8.5 w-8.5 rounded-sm hover:bg-text-600 hover:text-white pi pi-search p-2 cursor-pointer"
            @click="isFiltersActive = false"></button>
        </div>

        <hr class="border-l border-gray-700 h-[1px] w-full mb-4" />

        <!-- Chip selectors for actors typology -->
        <div class="w-full flex flex-row gap-2 pb-2 overflow-hidden">
          <button
            v-for="actor in actorsType"
            :key="actor.id"
            :name="actor.name"
            @click="handleSelectActorsChange(actor.name, [actor.name])"
            class="px-3 py-2 rounded-full text-xs w-1/6 font-medium cursor-pointer flex items-center justify-between opacity-50"
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
        class="container mx-auto mt-6 px-4 lg:mt-10 lg:p-0 xl:px-16 2xl:px-20 flex flex-col gap-2 items-end w-full lg:flex-row lg:flex-none lg:gap-4">
        <!-- Button - Change state -->
        <button
          class="border border-gray-700 h-8.5 w-8.5 rounded-sm hover:bg-text-600 hover:text-white pi pi-bars p-2 cursor-pointer"
          @click="isFiltersActive = true"></button>

        <div class="border-l border-gray-700 h-8"></div>

        <!-- Search -->
        <div class="flex flex-col gap-2 w-full">
          <label class="font-bold text-xs xl:text-sm 2xl:text-base">Search</label>
          <InputText
            type="text"
            placeholder="Search..."
            size="small"
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
