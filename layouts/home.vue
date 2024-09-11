<script setup lang="ts">
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const SideMenu = defineAsyncComponent(() => import('@/components/Layouts/HomeSideBarMenu.vue'))
  // add shere button + top
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Layouts/Footer.vue'))

const menuNavigation = useMenuNavigation();

const { isMobile } = useDevice();

useSeo({
  title: 'Société Astronomique de Montpellier',
  description: 'À la découverte du ciel',
  image: ''
})

</script>

<template>
  <div>
    <Header :isHome=true v-if="isMobile" :menu="menuNavigation" />
    <div class="flex-fill">
      <slot />
    </div>
    <SideMenu />
    <Footer :menu="menuNavigation"  />
  </div>
</template>

<style scoped>

</style>