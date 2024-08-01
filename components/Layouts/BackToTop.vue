<script setup lang="ts">
import type {Ref} from "vue";
const { t } = useI18n();

const isVisible: Ref<boolean> = ref(false);
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  isVisible.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const displayBtn = computed<string>(() => isVisible.value ? 'visible' : 'hidden' )
const backToTopLabel = computed<string>(() => t('layout.backToTop'))
</script>

<template>
  <button
    @click="scrollToTop"
    :class="`backToTop text-indigo-700 border border-indigo-700 hover:bg-indigo-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:focus:ring-indigo-800 dark:hover:bg-indigo-500$ ${displayBtn}`"
    type="button"
    :aria-label="backToTopLabel"
  >
    <Icon name="material-symbols:arrow-upward" size="36" />
  </button>
</template>

<style scoped>
.backToTop {
  position: fixed;
  bottom: 1em;
  right: 5px;
  z-index: 999;
  transition: all 0.5s ease;
  cursor: pointer;
}
</style>