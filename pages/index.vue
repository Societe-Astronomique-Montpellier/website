<script setup lang="ts">

// Layout
definePageMeta({
  layout: 'home',
});

// Components
const HeroPresentation = defineAsyncComponent(() => import('@/components/home/HeroPresentation.vue'))

// Prismic
</script>

<template>
Site de la SAM
  <HeroPresentation />
</template>

<style scoped>

</style>
