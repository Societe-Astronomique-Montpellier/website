<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Layouts/Footer.vue'))
const SocialShare = defineAsyncComponent(() => import('@/components/Layouts/SidebarSocialShare.vue'))
const Modal = defineAsyncComponent(() => import('@/components/content/Modal.vue'))
const menuNavigation = useMenuNavigation();
const shareSocialMedia = useSocialShareMedia();

const isModalOpened: Ref<boolean> = ref(false);
const handleOpenModal = (isOpenModal: boolean) => isModalOpened.value = isOpenModal
const handleCloseModal = (isCloseModal: boolean) => isModalOpened.value = isCloseModal

useSeo({
   title: 'Société Astronomique de Montpellier',
   description: 'À la découverte du ciel',
   image: ''
 })
</script>

<template>
  <div>
    <Header :isHome=false :menu="menuNavigation" :openModal="!isModalOpened" @openSearchModal="handleOpenModal" />
    <Modal
      :isOpen="isModalOpened"
      @closeModal="handleCloseModal"
    >
      <template v-slot:header>Rechercher sur le site</template>
      <template v-slot:content>
        <input type="text" >
      </template>
    </Modal>
    <div class="flex-fill">
      <slot />
    </div>

    <Footer :menu="menuNavigation" />
    <SocialShare :shareSocialMedia="shareSocialMedia" />
  </div>

</template>

<style scoped>

</style>