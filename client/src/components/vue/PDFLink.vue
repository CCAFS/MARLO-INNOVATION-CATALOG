<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import { useApi } from '~/composables/database-api/useApi';

const props = withDefaults(
  defineProps<{
    id: string;
    isJustIcon?: boolean;
    className?: string;
    buttonText?: string;
  }>(),
  {
    buttonText: 'Download PDF'
  }
);

const visible = ref(false);
const isLoading = ref(false);
const form = ref({
  userName: '',
  userEmail: '',
  interestNarrative: ''
});

function resetForm() {
  form.value = { userName: '', userEmail: '', interestNarrative: '' };
}

async function handleSubmit() {
  isLoading.value = true;
  try {
    const { postInnovationReport, getInnovationPDFById } = useApi();

    const nameParts = form.value.userName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    await postInnovationReport({
      innovation_id: parseInt(props.id),
      user_name: firstName,
      user_lastname: lastName,
      user_email: form.value.userEmail,
      interest_narrative: form.value.interestNarrative,
      modification_justification: 'Initial stakeholder outreach'
    });

    const response = await getInnovationPDFById(props.id);
    if (response?.pdfUrl) {
      window.open(response.pdfUrl, '_blank');
      visible.value = false;
      resetForm();
    } else {
      alert('Failed to generate PDF. Please try again later.');
    }
  } catch {
    alert('Failed to process your request. Please try again later.');
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <button
    type="button"
    :class="[
      'basic-button inline-flex items-center justify-center px-4 py-2.25 border rounded-lg',
      'text-xs xl:text-sm 2xl:text-base leading-[10px] font-medium cursor-pointer mb-2',
      isJustIcon ? 'w-[36px] h-[36px] gap-0' : 'gap-1',
      className ?? 'border-secondary-300 text-secondary-300'
    ]"
    @click="visible = true">
    <i class="pi pi-file-pdf text-[1rem]" />
    <span v-if="!isJustIcon">{{ buttonText }}</span>
  </button>

  <Dialog
    v-model:visible="visible"
    header="PDF Download Request"
    :modal="true"
    :draggable="false"
    :style="{ width: '28rem' }"
    append-to="body"
    @hide="resetForm">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="pdf-user-name" class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input
          id="pdf-user-name"
          v-model="form.userName"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary-300"
          placeholder="Enter your full name" />
      </div>

      <div>
        <label for="pdf-user-email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          id="pdf-user-email"
          v-model="form.userEmail"
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary-300"
          placeholder="Enter your email address" />
      </div>

      <div>
        <label for="pdf-interest" class="block text-sm font-medium text-gray-700 mb-1"
          >Why are you interested in this innovation? *</label
        >
        <textarea
          id="pdf-interest"
          v-model="form.interestNarrative"
          required
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary-300"
          placeholder="Please describe your interest in this innovation"></textarea>
      </div>

      <div class="flex gap-3 pt-4">
        <button
          type="button"
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary-300"
          @click="visible = false">
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isLoading"
          class="flex-1 px-4 py-2 bg-secondary-300 text-white rounded-md hover:bg-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ isLoading ? 'Processing...' : 'Download PDF' }}
        </button>
      </div>
    </form>
  </Dialog>
</template>
