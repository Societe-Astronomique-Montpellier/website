<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Layouts/Footer.vue'))
const SocialShare = defineAsyncComponent(() => import('@/components/Layouts/SidebarSocialShare.vue'))

const menuNavigation = useMenuNavigation();
const shareSocialMedia = useSocialShareMedia();

useSeo({
   title: 'Société Astronomique de Montpellier',
   description: 'À la découverte du ciel',
   image: ''
 })
</script>

<template>
  <div>
    <SocialShare :shareSocialMedia="shareSocialMedia" />
    <Header :isHome=false :menu="menuNavigation" />
    <div class="flex-fill">
      <slot />
    </div>
    <Footer :menu="menuNavigation" />
  </div>

</template>

<style scoped>

</style>