<script setup lang="ts">
const colorMode = useColorMode();
const { isMobile } = useDevice();

const isDark = computed<boolean>({
  get: () => colorMode.preference === "dark",
  set: (value: boolean) => {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <div
    :class="
      isMobile
        ? ``
        : `flex items-center justify-center h-20`
    "
  >
    <!-- Slider with Sun and Moon icons -->
    <input
      id="dark-mode-toggle"
      v-model="isDark"
      type="checkbox"
      class="hidden"
    />
    <label
      for="dark-mode-toggle"
      class="relative w-14 h-8 rounded-full cursor-pointer transition"
      :class="{ 'bg-gray-300': !isDark, 'bg-slate-600': isDark }"
    >
      <!-- Slider background -->
      <span
        class="absolute top-1 left-1 h-6 w-6 bg-white rounded-full transition transform"
        :class="{ 'translate-x-6': isDark }"
      ></span>
      <!-- Sun icon for Light mode -->
      <Icon
        name="material-symbols-light:sunny"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 text-yellow-500 transition-opacity"
        :class="{ 'opacity-0': isDark }"
      />
      <!-- Moon icon for Dark mode -->
      <Icon
        name="material-symbols-light:dark-mode"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 transition-opacity"
        :class="{ 'opacity-0': !isDark }"
      />
    </label>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  display: none;
}
</style>
