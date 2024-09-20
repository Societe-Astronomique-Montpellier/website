<script setup lang="ts">
const { isMobile } = useDevice();
const props = defineProps<{
  isOpen: boolean;
}>();
const { isOpen } = toRefs(props);

const emit = defineEmits<{
  (e: "closeModal", isCloseModal: boolean): void;
}>();
const onclose = () => emit("closeModal", !isOpen.value);
const closeModalOnOutsideClick = (event: MouseEvent) => {
  const modalContainer = document.querySelector(".bg-white");
  if (modalContainer && !modalContainer.contains(event.target as Node)) {
    onclose();
  }
};

const modalClass: ComputedRef<string> = computed<string>(() =>
  isMobile ? "top-9 mt-2" : "flex items-center justify-center",
);
const containerClass: ComputedRef<string> = computed<string>(() =>
  isMobile ? "h-full p-2" : "max-w-4xl p-6 rounded-lg ",
);
</script>

<template>
  <div
    v-if="isOpen"
    id="modal-overlay"
    :class="`fixed inset-0 bg-gray-800 bg-opacity-75 z-500 ${modalClass}`"
    @click="closeModalOnOutsideClick"
  >
    <!-- Modal Container -->
    <div
      :class="`bg-white w-full shadow-lg relative ${containerClass}`"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-gray-900 font-semibold text-2xl mb-2">
          <slot name="header"></slot>
        </h3>
        <button class="text-gray-600 hover:text-gray-800" @click="onclose">
          ✖
        </button>
      </div>
      <hr v-if="!isMobile" />
      <div class="mt-4">
        <slot name="content"></slot>
      </div>
      <!-- Search Input with Icon -->
    </div>
  </div>
</template>

<style scoped></style>
