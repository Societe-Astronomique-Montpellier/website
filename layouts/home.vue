<script setup lang="ts">
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const SideMenu = defineAsyncComponent(() => import('@/components/Layouts/HomeSideBarMenu.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Layouts/Footer.vue'))

const menuNavigation = useMenuNavigation();
const { isMobile } = useDevice();

const isModalOpened: Ref<boolean> = ref(false);
const handleOpenModal = (isOpenModal: boolean) => isModalOpened.value = isOpenModal
// const handleCloseModal = (isCloseModal: boolean) => isModalOpened.value = isCloseModal

useSeo({
  title: 'Société Astronomique de Montpellier',
  description: 'À la découverte du ciel',
  image: ''
})

</script>

<template>
  <div>
    <Header :isHome=true :menu="menuNavigation" :openModal="!isModalOpened" @openSearchModal="handleOpenModal"  />
    <div class="flex-fill">
      <slot />
    </div>
    <SideMenu />
    <Footer :menu="menuNavigation"  />
  </div>
</template>

<style scoped>

</style>