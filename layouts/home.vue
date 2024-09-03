<script setup lang="ts">
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const SideMenu = defineAsyncComponent(() => import('@/components/Layouts/HomeSideBarMenu.vue'))
  // add shere button + top
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Layouts/Footer.vue'))

const { isMobile } = useDevice();

useSeo({
  title: 'Société Astronomique de Montpellier',
  description: 'À la découverte du ciel',
  image: ''
})

</script>

<template>
  <Header :isHome=true v-if="isMobile" />
  <div class="flex-fill">
    <slot />
  </div>
  <SideMenu />
  <Footer />
</template>

<style scoped>

</style>