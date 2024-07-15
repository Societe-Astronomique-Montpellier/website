<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
</script>

<template>
  <Header />
  <div class="flex-fill font-sans">
    <slot />
  </div>
  <Copyright />
</template>

<style scoped>

</style>