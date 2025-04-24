<script setup lang="ts">
const colorMode = useColorMode();
const { t } = useI18n();
const translateXClass: Ref<string> = ref("");
const opacityClass: Ref<string> = ref("");

// Ensure isDark is only computed on the client-side after mounting
const isDark = computed({
  get: () => colorMode.preference === "dark",
  set: (value: boolean) => {
    colorMode.preference = value ? "dark" : "light";
    updateClasses(value);
  },
});

const updateClasses = (isDark: boolean) => {
  translateXClass.value = isDark ? "translate-x-6" : "";
  opacityClass.value = isDark ? "opacity-0" : "";
};

// Ensure `isDark` is initialized on the client-side
onMounted(() => {
  isDark.value = colorMode.preference === "dark";
  updateClasses(isDark.value);
});
</script>

<template>
  <button
    type="button"
    id="dark-mode-toggle"
    class="text-gray-700 dark:text-gray-200 p-2 rounded-full transition-colors duration-200"
    :aria-label="t('layout.toggleMode')"
    role="button"
    @click="isDark = !isDark"
  >
    <Icon
      v-if="!isDark"
      size="32"
      name="material-symbols-light:sunny"
      :class="`transform text-yellow-500 transition-opacity ${opacityClass}`"
    />
    <Icon
      v-if="isDark"
      size="32"
      name="material-symbols-light:dark-mode"
      :class="`transform  text-gray-200 transition-opacity ${opacityClass === '' ? 'opacity-0' : ''}`"
    />
  </button>
</template>
