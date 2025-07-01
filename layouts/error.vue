<script setup lang="ts">
import defaultImg from "../public/logo.png";

useSeo({
  title: "Société Astronomique de Montpellier - Page 404",
  description: "À la découverte du ciel",
  image: defaultImg,
});
</script>

<template>
  <div class="flex-fill">
    <slot />
  </div>
</template>

<style scoped></style>
