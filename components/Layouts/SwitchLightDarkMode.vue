<script setup lang="ts">
const colorMode = useColorMode();
const { isMobile } = useDevice();

const bglabel: Ref<string> = ref("");
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
  bglabel.value = isDark ? "bg-slate-600" : "bg-gray-300";
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
  <div :class="isMobile ? '' : 'flex items-center justify-center h-20'">
    <input
      id="dark-mode-toggle"
      v-model="isDark"
      type="checkbox"
      class="hidden"
    />
    <label
      for="dark-mode-toggle"
      :class="`relative w-14 h-8 rounded-full cursor-pointer transition ${bglabel}`"
    >
      <span
        :class="`absolute top-1 left-1 h-6 w-6 bg-white rounded-full transition transform ${translateXClass}`"
      ></span>
      <Icon
        name="material-symbols-light:sunny"
        :class="`absolute left-2 top-1/2 transform -translate-y-1/2 text-yellow-500 transition-opacity ${opacityClass}`"
      />
      <Icon
        name="material-symbols-light:dark-mode"
        :class="`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 transition-opacity ${opacityClass === '' ? 'opacity-0' : ''}`"
      />
    </label>
  </div>
</template>
