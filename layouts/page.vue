<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Layouts/Footer.vue'))
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
  <SocialShare />
  <Footer />
</template>

<style scoped>

</style>