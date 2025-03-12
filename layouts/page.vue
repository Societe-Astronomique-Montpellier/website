<script setup lang="ts">
// add header + footer
const { t } = useI18n();

const Header = defineAsyncComponent(
  () => import("@/components/Layouts/Header.vue"),
);
const Footer = defineAsyncComponent(
  () => import("@/components/Layouts/Footer.vue"),
);
const SidebarSocialShare = defineAsyncComponent(
  () => import("@/components/Layouts/SidebarSocialShare.vue"),
);

const menuNavigation = useMenuNavigation();

useSeo({
  title: t("layout.title"),
  description: "À la découverte du ciel",
  image: undefined,
});
</script>

<template>
  <div>
    <Header :is-home="false" :menu="menuNavigation" />
    <div class="flex-fill">
      <slot />
    </div>
    <Footer :menu="menuNavigation" />
    <SidebarSocialShare />
  </div>
</template>

<style scoped></style>
