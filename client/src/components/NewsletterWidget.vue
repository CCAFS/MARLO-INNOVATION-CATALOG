<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '~/composables/database-api/useApi';

const isCollapsed = ref(false);
const email = ref('');
const statusMessage = ref('');
const statusType = ref<'success' | 'error' | ''>('');
const isSubmitting = ref(false);

const { postNewsletterSubscription } = useApi();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toggleWidget() {
  isCollapsed.value = !isCollapsed.value;
  if (!isCollapsed.value) {
    statusMessage.value = '';
    statusType.value = '';
  }
}

async function handleSubmit() {
  const trimmedEmail = email.value.trim();

  if (!emailPattern.test(trimmedEmail)) {
    statusMessage.value = 'Please enter a valid email.';
    statusType.value = 'error';
    return;
  }

  try {
    isSubmitting.value = true;
    await postNewsletterSubscription(trimmedEmail);
    statusMessage.value = 'Thank you for subscribing!';
    statusType.value = 'success';
    email.value = '';
  } catch (err) {
    statusMessage.value = 'An error occurred while subscribing. Please try again.';
    statusType.value = 'error';
    console.error('Failed to subscribe to newsletter', err);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <aside class="newsletter-widget" :class="{ collapsed: isCollapsed }" aria-live="polite">
    <div v-if="!isCollapsed" class="widget-panel">
      <button class="close-button" type="button" aria-label="Close newsletter" @click="toggleWidget">
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2 2l10 10m0-10L2 12" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <p class="widget-title">Don't Miss Out!</p>
      <p class="widget-description">
        Discover the latest innovations, inspiring stories, and exclusive opportunities within the AICCRA ecosystem. Subscribe to our newsletter and
        be the first to receive valuable content that will help you stay ahead of the curve.
      </p>
      <form class="form" @submit.prevent="handleSubmit">
        <label class="label" for="newsletter-email">E-mail:</label>
        <input id="newsletter-email" v-model="email" class="input" type="email" placeholder="name@email.com" :disabled="isSubmitting" />
        <button class="submit" type="submit" :disabled="isSubmitting">
          <span v-if="isSubmitting">Sending…</span>
          <span v-else>Stay connected</span>
        </button>
        <p class="form-note">Be part of our community of innovators.</p>
      </form>
      <p v-if="statusMessage" class="status" :class="statusType">{{ statusMessage }}</p>
    </div>

    <button v-else class="collapsed-tab" type="button" aria-label="Open newsletter" @click="toggleWidget">
      <span class="arrow-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M11 3L5 8l6 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="vertical-text">Newsletter</span>
      <span class="envelope-icon" aria-hidden="true">
        <svg viewBox="0 0 20 16">
          <path
            d="M1 3.5A2.5 2.5 0 0 1 3.5 1h13A2.5 2.5 0 0 1 19 3.5v9A2.5 2.5 0 0 1 16.5 15h-13A2.5 2.5 0 0 1 1 12.5v-9z"
            stroke-width="1.5"
            fill="none" />
          <path d="M2 2l8 6 8-6" stroke-width="1.5" fill="none" />
        </svg>
      </span>
    </button>
  </aside>
</template>

<style scoped>
.newsletter-widget {
  position: fixed;
  top: 25%;
  right: 0;
  transform: translateY(-50%);
  width: 460px;
  height: 310px;
  max-height: 310px;
  transition: width 0.3s cubic-bezier(0.47, 0, 0.23, 1.38);
  z-index: 40;
  font-family: 'Nunito', 'Helvetica Neue', Arial, sans-serif;
}

.newsletter-widget.collapsed {
  width: 43px;
  height: 219px;
  max-height: 219px;
  transition: width 0.1s linear;
}

.widget-panel {
  background-color: #ffffff;
  border-radius: 12px 0 0 12px;
  border: 1px solid rgba(0, 118, 148, 0.45);
  box-shadow: 0 8px 24px rgb(15 39 64 / 20%), 0 0 20px rgba(15, 39, 64, 0.1);
  backdrop-filter: blur(2px);
  padding: 1.5rem 1.25rem 1.25rem;
  position: relative;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #007694;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.close-button svg {
  width: 14px;
  height: 14px;
  stroke: #ffffff;
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #007694;
  margin: 0 0 0.5rem;
}

.widget-description {
  font-size: 0.85rem;
  color: #264653;
  margin-bottom: 1rem;
  text-align: justify;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1d3557;
}

.input {
  border: 1px solid #b7c5cf;
  border-radius: 6px;
  padding: 0.35rem 0.65rem;
  font-size: 0.95rem;
}

.input:focus {
  outline: 2px solid #008bb0;
  border-color: transparent;
}

.submit {
  align-self: center;
  padding: 0.35rem 3.2rem;
  background-color: #007694;
  color: #ffffff;
  border: none;
  border-radius: 9px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
}

.submit:hover {
  background-color: #006b8a;
}

.submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.form-note {
  margin: 0;
  text-align: center;
  color: #7a7a7a;
  font-size: 0.82rem;
  font-weight: 500;
}

.status {
  margin-top: 0.75rem;
  font-size: 0.85rem;
}

.status.success {
  color: #1b7c54;
}

.status.error {
  color: #c0392b;
}

.collapsed-tab {
  width: 48px;
  height: 219px;
  max-height: 219px;
  border-radius: 9px 0 0 12px;
  border: 1px solid rgba(0, 118, 148, 0.45);
  border-right: none;
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgb(15 39 64 / 20%), 0 0 20px rgba(15, 39, 64, 0.1);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.35rem 0.85rem;
  cursor: pointer;
}

.arrow-icon,
.envelope-icon {
  width: 28px;
  height: 28px;
  aspect-ratio: 1 / 1;
  background-color: #007694;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.arrow-icon {
  margin-bottom: 0.4rem;
}

.envelope-icon {
  margin-top: 0.3rem;
}

.arrow-icon svg,
.envelope-icon svg {
  width: 16px;
  height: 16px;
  stroke: #ffffff;
}

.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #007694;
  font-size: 0.75rem;
  margin: 0.1rem 0;
}

@media (max-width: 768px) {
  .newsletter-widget {
    display: none;
  }
}
</style>
