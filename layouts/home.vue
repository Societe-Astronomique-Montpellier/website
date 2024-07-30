<script setup lang="ts">
const route = useRoute()
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
  // add shere button + top
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
const BackToTop = defineAsyncComponent(() => import('@/components/Layouts/BackToTop.vue'))

const { isMobile } = useDevice();
</script>

<template>
  <Header :isHome=true v-if="isMobile" />
  <div class="flex-fill font-sans">
    <slot />
  </div>
  <Copyright />
  <BackToTop />
</template>

<style scoped>

</style>