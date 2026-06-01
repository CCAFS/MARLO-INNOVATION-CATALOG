<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import getSharingLink from '~/utils/share-link/getSharingLink';
import type { ShareParams } from '~/interfaces/share-params.interface';
import { texts } from '~/content/texts';
import type { Button } from 'primevue';

const HOVER_HIDE_DELAY_MS = 200;

const props = withDefaults(
  defineProps<{
    sharePath?: string;
    shareMessage?: string;
    variant?: 'hero' | 'sidebar';
    triggerClass?: string;
  }>(),
  {
    sharePath: '',
    shareMessage: () => texts.innovation.shareMessage,
    variant: 'sidebar',
    triggerClass: ''
  }
);

const menu = ref<InstanceType<typeof Menu> | null>(null);
const buttonRef = ref<InstanceType<typeof Button> | HTMLButtonElement | null>(null);
const copyLabel = ref(texts.innovation.shareMenu.copyLink);
const menuId = `social-share-menu-${props.variant}`;

let hideTimer: ReturnType<typeof setTimeout> | null = null;
let menuPanelEl: HTMLElement | null = null;

const shareUrl = computed(() => {
  const path = props.sharePath || (typeof globalThis.window !== 'undefined' ? globalThis.window.location.pathname : '');
  if (!path) return '';
  return path.startsWith('http') ? path : `${globalThis.window.location.origin}${path}`;
});

const shareTitle = computed(() => props.shareMessage || texts.innovation.shareMessage);

const heroTriggerClass = computed(
  () =>
    props.triggerClass ||
    [
      'inline-flex items-center justify-center px-4 py-2.25 border rounded-lg',
      'text-xs leading-[10px] font-medium cursor-pointer gap-1 w-[36px] h-[36px] min-w-[36px]',
      '!mb-0 !border-white/70 !text-white bg-white/10 hover:!bg-white/25 hover:!text-white hover:!border-transparent backdrop-blur-sm'
    ].join(' ')
);

const sidebarButtonClass =
  'basic-button inline-flex items-center justify-center gap-1 px-4 py-2.25 border rounded-lg text-xs leading-[10px] font-medium cursor-pointer w-full min-h-[36px] border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white hover:border-transparent';

const buttonPt = {
  root: { class: '!text-xs' },
  icon: { class: '!text-[12px]' },
  label: { class: '!text-[12px]' }
};

const menuPt = {
  root: { class: 'min-w-[11rem] !text-[12px]' },
  itemLink: { class: '!text-[12px] gap-2 py-1.5 px-3' },
  itemIcon: { class: '!text-[12px]' },
  itemLabel: { class: '!text-[12px]' }
};

function getButtonEl(): HTMLElement | null {
  const btn = buttonRef.value;
  if (btn instanceof HTMLElement) return btn;
  return (btn as { $el?: HTMLElement } | null)?.$el ?? null;
}

function cancelHide() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function scheduleHide() {
  cancelHide();
  hideTimer = setTimeout(() => {
    menu.value?.hide();
    hideTimer = null;
  }, HOVER_HIDE_DELAY_MS);
}

function showMenu(event: Event) {
  cancelHide();
  const target = getButtonEl();
  if (target && menu.value) {
    menu.value.show(event, target);
  }
}

function bindMenuPanelHover() {
  const menuInstance = menu.value as { container?: HTMLElement } | null;
  const panel = menuInstance?.container ?? document.getElementById(menuId);
  if (!panel || panel.dataset.hoverBound === 'true') return;

  panel.dataset.hoverBound = 'true';
  menuPanelEl = panel;
  panel.addEventListener('mouseenter', cancelHide);
  panel.addEventListener('mouseleave', scheduleHide);
}

function onMenuShow() {
  nextTick(bindMenuPanelHover);
}

function onWrapperMouseEnter(event: Event) {
  showMenu(event);
}

function onWrapperMouseLeave() {
  scheduleHide();
}

function openShare(network: ShareParams['network']) {
  if (!shareUrl.value) return;

  const shareParams: ShareParams = { url: shareUrl.value, network };
  if (network === 'twitter' || network === 'linkedin') {
    shareParams.title = shareTitle.value;
  }
  if (network === 'twitter') {
    shareParams.hashtags = 'Innovation,Research,AICCRA';
  }

  globalThis.open(getSharingLink(shareParams), '_blank', 'noopener,noreferrer');
  menu.value?.hide();
}

async function copyLink() {
  if (!shareUrl.value) return;

  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copyLabel.value = texts.innovation.shareMenu.copied;
    (globalThis as typeof globalThis & { onUseToast?: (o: object) => void }).onUseToast?.({
      severity: 'success',
      summary: 'Success',
      detail: texts.innovation.shareMenu.copied,
      life: 2000
    });
    setTimeout(() => {
      copyLabel.value = texts.innovation.shareMenu.copyLink;
    }, 2000);
  } catch {
    copyLabel.value = texts.innovation.shareMenu.copyFailed;
    (globalThis as typeof globalThis & { onUseToast?: (o: object) => void }).onUseToast?.({
      severity: 'error',
      summary: 'Error',
      detail: texts.innovation.shareMenu.copyFailed,
      life: 3000
    });
    setTimeout(() => {
      copyLabel.value = texts.innovation.shareMenu.copyLink;
    }, 2000);
  }
  menu.value?.hide();
}

const menuItems = computed<MenuItem[]>(() => [
  {
    label: texts.innovation.shareMenu.linkedin,
    icon: 'pi pi-linkedin',
    command: () => openShare('linkedin')
  },
  {
    label: texts.innovation.shareMenu.facebook,
    icon: 'pi pi-facebook',
    command: () => openShare('facebook')
  },
  {
    label: texts.innovation.shareMenu.twitter,
    icon: 'pi pi-twitter',
    command: () => openShare('twitter')
  },
  {
    label: copyLabel.value,
    icon: 'pi pi-link',
    command: () => copyLink()
  }
]);

function toggle(event: Event) {
  const target = getButtonEl();
  if (target) {
    menu.value?.toggle(event, target);
  } else {
    menu.value?.toggle(event);
  }
}

onBeforeUnmount(() => {
  cancelHide();
  if (menuPanelEl) {
    menuPanelEl.removeEventListener('mouseenter', cancelHide);
    menuPanelEl.removeEventListener('mouseleave', scheduleHide);
    menuPanelEl = null;
  }
});
</script>

<template>
  <div class="social-share-menu" @mouseenter="onWrapperMouseEnter" @mouseleave="onWrapperMouseLeave">
    <button
      v-if="variant === 'hero'"
      ref="buttonRef"
      type="button"
      :class="heroTriggerClass"
      aria-haspopup="true"
      :aria-controls="menuId"
      @click="toggle">
      <i class="pi pi-share-alt text-[1rem]" aria-hidden="true"></i>
    </button>
    <button v-else ref="buttonRef" type="button" :class="sidebarButtonClass" aria-haspopup="true" :aria-controls="menuId" @click="toggle">
      <i class="pi pi-share-alt text-[12px]!" />
      <span class="text-[12px]">{{ texts.innovation.shareMenu.buttonLabel }}</span>
    </button>
    <Menu :id="menuId" ref="menu" :model="menuItems" popup append-to="body" :pt="menuPt" @show="onMenuShow" />
  </div>
</template>

<style scoped>
.social-share-menu :deep(.p-menu-item-link) {
  font-size: 12px;
}

.social-share-menu :deep(.p-menu-item-icon) {
  font-size: 12px;
}

.social-share-menu :deep(.p-button-icon) {
  font-size: 12px;
}

.social-share-menu :deep(.p-button-label) {
  font-size: 12px;
}
</style>
