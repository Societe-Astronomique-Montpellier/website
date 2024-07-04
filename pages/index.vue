<script setup lang="ts">

// Layout
definePageMeta({
  layout: 'home',
});

// Components
const HeroPresentation = defineAsyncComponent(() => import('@/components/home/HeroPresentation'))

// Prismic
</script>

<template>
  <HeroPresentation />
</template>

<style scoped>

</style>