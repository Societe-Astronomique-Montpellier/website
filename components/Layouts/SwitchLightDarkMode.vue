<script setup lang="ts">
const colorMode = useColorMode();
const toggleModeTheme = computed({
  get: () => colorMode.value === "dark",
  set: (value) => {
    colorMode.value = value ? "dark" : "light";
  },
});
</script>

<template>
<!--  <div class="flex flex-col justify-center ml-3"></div>-->

  <div class="flex items-center justify-center h-20">
    <!-- Slider with Sun and Moon icons -->
    <input
      id="dark-mode-toggle"
      v-model="toggleModeTheme"
      type="checkbox"
      class="hidden"
    />
    <label
      for="dark-mode-toggle"
      class="relative w-14 h-8 bg-gray-300 rounded-full cursor-pointer transition"
    >
      <!-- Slider background -->
      <span
        class="absolute top-1 left-1 h-6 w-6 bg-white rounded-full transition transform"
        :class="{ 'translate-x-6': toggleModeTheme }"
      ></span>
      <!-- Sun icon for Light mode -->
      <Icon
        name="material-symbols-light:sunny"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 text-yellow-500 transition-opacity"
        :class="{ 'opacity-0': toggleModeTheme }"
      />
      <!-- Moon icon for Dark mode -->
      <Icon
        name="material-symbols-light:dark-mode"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 transition-opacity"
        :class="{ 'opacity-0': !toggleModeTheme }"
      />
    </label>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  display: none;
}
</style>
