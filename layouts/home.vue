<script setup lang="ts">
const route = useRoute()

  // add shere button + top
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
const BackToTop = defineAsyncComponent(() => import('@/components/Layouts/BackToTop.vue'))
</script>

<template>
  <div class="flex-fill font-sans">
    <slot />
  </div>
  <Copyright />
  <BackToTop />
</template>

<style scoped>

</style>