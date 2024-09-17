<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Layouts/Footer.vue'))
const SidebarSocialShare = defineAsyncComponent(() => import('@/components/Layouts/SidebarSocialShare.vue'))
const Modal = defineAsyncComponent(() => import('@/components/content/Modal.vue'))

const menuNavigation = useMenuNavigation();

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
    <div class="flex-fill">
      <slot />
    </div>
    <Modal
      v-if="isModalOpened"
      :isOpen="isModalOpened"
      @closeModal="handleCloseModal"
    >
      <template v-slot:header>Rechercher sur le site</template>
      <template v-slot:content>


        <form class="max-w-md mx-auto">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Icon name="material-symbols-light:search" size="18" />
            </div>
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>


      </template>
    </Modal>

    <Footer :menu="menuNavigation" />
    <SidebarSocialShare />
  </div>

</template>

<style scoped>

</style>