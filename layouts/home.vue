<script setup lang="ts">
import defaultImg from "../public/logo.png";

const Header = defineAsyncComponent(
  () => import("@/components/Layouts/Header.vue"),
);
const SideMenu = defineAsyncComponent(
  () => import("@/components/Layouts/HomeSideBarMenu.vue"),
);
const SidebarSocialShare = defineAsyncComponent(
  () => import("@/components/Layouts/SidebarSocialShare.vue"),
);
const Footer = defineAsyncComponent(
  () => import("@/components/Layouts/Footer.vue"),
);
// const Modal = defineAsyncComponent(
//   () => import("@/components/content/Modal.vue"),
// );

const menuNavigation = useMenuNavigation();

useSeo({
  title: "Société Astronomique de Montpellier",
  description: "À la découverte du ciel",
  image: defaultImg,
});
</script>

<template>
  <div>
    <Header :is-home="true" :menu="menuNavigation" />
    <div class="flex-fill">
      <slot />
    </div>
    <!-- Modal
      @close-modal="handleCloseModal"
    >
      <template #header>{{ t("search.title") }}</template>
      <template #content>
      </template>
    </Modal -->
    <SideMenu />
    <Footer :menu="menuNavigation" />
    <SidebarSocialShare />
  </div>
</template>

<style scoped></style>
