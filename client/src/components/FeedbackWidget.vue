<script setup lang="ts">
import { ref } from 'vue';

const isCollapsed = ref(false);

const feedbackFormUrl =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=AA76ahT6t0CKLiKn-MNX1cKOFRD40kNLiWEhC_u7oVxUQkJQUjE2UEsyN0RXTUY5RUFSRjJSSUVBMS4u';

function toggleWidget() {
  isCollapsed.value = !isCollapsed.value;
}

function openFeedbackForm() {
  window.open(feedbackFormUrl, '_blank', 'noopener,noreferrer');
}
</script>

<template>
  <aside class="feedback-widget" :class="{ collapsed: isCollapsed }" aria-live="polite">
    <div v-if="!isCollapsed" class="widget-panel">
      <button class="close-button" type="button" aria-label="Close feedback" @click="toggleWidget">
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <path d="M2 2l10 10m0-10L2 12" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <p class="widget-title">Share Your Feedback</p>
      <p class="widget-description">Your feedback is essential to improve this catalog</p>
      <button class="submit" type="button" @click="openFeedbackForm">Send my opinion</button>
    </div>

    <button v-else class="collapsed-tab" type="button" aria-label="Open feedback" @click="toggleWidget">
      <span class="arrow-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M11 3L5 8l6 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="vertical-text">Feedback</span>
      <span class="message-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20">
          <path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5l-4 3-4-3H4a2 2 0 0 1-2-2V4z" stroke-width="1.5" fill="none" />
        </svg>
      </span>
    </button>
  </aside>
</template>

<style scoped>
.feedback-widget {
  position: fixed;
  bottom: 25%;
  right: 0;
  transform: translateY(50%);
  width: 460px;
  height: 219px;
  max-height: 219px;
  transition: width 0.3s cubic-bezier(0.47, 0, 0.23, 1.38);
  z-index: 40;
  font-family: 'Nunito', 'Helvetica Neue', Arial, sans-serif;
}

.feedback-widget.collapsed {
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

.submit {
  align-self: center;
  padding: 0.35rem 2rem;
  background-color: #008bb0;
  color: #ffffff;
  border: none;
  border-radius: 9px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  display: block;
  margin: 2rem auto 0;
}

.submit:hover {
  background-color: #006b8a;
}

.submit:active {
  transform: scale(0.98);
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
.message-icon {
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

.message-icon {
  margin-top: 0.3rem;
}

.arrow-icon svg,
.message-icon svg {
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
  .feedback-widget {
    display: none;
  }
}
</style>
