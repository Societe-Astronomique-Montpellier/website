<script setup lang="ts">
import type {Ref} from "vue";

const { isMobile } = useDevice()
const { t } = useI18n();
const shareSocialMedia = useSocialShareMedia();

const iconSize: Ref<number> = ref(24)
const iconSizeMobile: Ref<number> = ref(18)
const isVisible: Ref<boolean> = ref(false);

const displayBtn = computed<string>(() => isVisible.value ? 'visible' : 'hidden' )
const displayIconSize: ComputedRef<number> = computed<number>(() => isMobile ? iconSizeMobile.value : iconSize.value)
const backToTopLabel = computed<string>(() => t('layout.backToTop'))

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  isVisible.value = window.scrollY > 200;
};
</script>

<template>
  <nav
    class="
      z-20 shrink-0 grow-0 justify-around gap-1 border-t border-indigo-700
      bg-white/50 p-1 shadow-lg backdrop-blur-lg
      dark:border-slate-600/60 dark:bg-slate-800/50
      fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex flex-col rounded-lg border"
  >
    <SocialShare
      v-for="network in shareSocialMedia"
      :key="network"
      :network="network.social_network"
      class="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1 text-grey-700 hover:bg-indigo-700 hover:text-white"
    >
    </SocialShare>
    <hr class="dark:border-gray-700/60" />
    <button
        @click="scrollToTop"
        :class="`flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1 text-grey-700 hover:bg-indigo-700 hover:text-white ${displayBtn}`"
        type="button"
        :aria-label="backToTopLabel"
    >
      <Icon name="material-symbols:arrow-upward" :size="displayIconSize" />
    </button>
  </nav>
</template>

<style scoped>

</style>