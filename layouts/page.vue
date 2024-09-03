<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
const SocialShare = defineAsyncComponent(() => import('@/components/Layouts/SidebarSocialShare.vue'))
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
  <SocialShare />
</template>

<style scoped>

</style>