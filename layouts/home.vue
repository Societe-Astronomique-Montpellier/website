<script setup lang="ts">
const route = useRoute()

  // add shere button + top
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
</script>

<template>
  <div class="flex-fill font-sans">
    <slot />
  </div>
  <Copyright />
</template>

<style scoped>

</style>