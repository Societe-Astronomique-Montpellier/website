<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
const BackToTop = defineAsyncComponent(() => import('@/components/Layouts/BackToTop.vue'))

 useSeo({
   title: 'Société Astronomique de Montpellier',
   description: 'À la découverte du ciel',
   image: ''
 })
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