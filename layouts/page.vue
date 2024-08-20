<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
const BackToTop = defineAsyncComponent(() => import('@/components/Layouts/BackToTop.vue'))
</script>

<template>
  <Header :isHome=false />
  <div class="flex-fill">
    <DelayHydration>
      <slot />
    </DelayHydration>
  </div>
  <Copyright />
  <BackToTop />
</template>

<style scoped>

</style>