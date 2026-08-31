<script setup lang="ts">
import type { Ref } from "vue";
import {asText} from "@prismicio/client";

const { isMobile } = useDevice();
const { t } = useI18n();

const { shareSocialMedia } = useSocialShareMedia();

const iconSize: Ref<number> = ref(20);
const iconSizeMobile: Ref<number> = ref(16);
const isVisible: Ref<boolean> = ref(false);

const displayBtn = computed<string>(() =>
  isVisible.value ? "visible" : "hidden",
);
const displayIconSize: ComputedRef<number> = computed<number>(() =>
  isMobile ? iconSizeMobile.value : iconSize.value,
);
const backToTopLabel = computed<string>(() => t("layout.backToTop"));
const navClasses: ComputedRef<string> = computed<string>(() =>
  isMobile
    ? "flex-inline bottom-0 md:w-auto w-full"
    : "-translate-y-2/4  flex-col top-2/4 right-3 rounded-lg border",
);

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const handleScroll = () => (isVisible.value = window.scrollY > 200);
</script>

<template>
  <nav
    :class="`
      z-20 shrink-0 grow-0 justify-around gap-1 border-t border-indigo-700
      bg-slate-800/50 p-2 shadow-lg backdrop-blur-lg
      dark:border-slate-600/60 dark:bg-slate-800/50
      fixed min-h-[auto] min-w-[64px] flex ${navClasses}`"
  >
    <client-only>
      <SocialShare
        v-for="(network, i) in shareSocialMedia"
        :key="i"
        :network="network.social_network ?? ''"
        class="flex aspect-square min-h-[32px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1 text-grey-700 dark:text-slate-400 hover:bg-indigo-700 hover:text-white"
      >
      </SocialShare>
    </client-only>

    <button
      :class="`flex aspect-square min-h-[32px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1 text-grey-700 dark:text-slate-400 hover:bg-indigo-700 hover:text-white ${displayBtn}`"
      type="button"
      :aria-label="backToTopLabel"
      @click="scrollToTop"
    >
      <Icon name="material-symbols:arrow-upward" :size="displayIconSize" />
    </button>
  </nav>
</template>

<style scoped></style>
