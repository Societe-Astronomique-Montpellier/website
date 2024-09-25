<script setup lang="ts">
const { isMobile } = useDevice();
const { t } = useI18n();

const Header = defineAsyncComponent(
  () => import("@/components/Layouts/Header.vue"),
);
const SideMenu = defineAsyncComponent(
  () => import("@/components/Layouts/HomeSideBarMenu.vue"),
);
const Footer = defineAsyncComponent(
  () => import("@/components/Layouts/Footer.vue"),
);
const Modal = defineAsyncComponent(
  () => import("@/components/content/Modal.vue"),
);

const menuNavigation = useMenuNavigation();
const { searchQuery, results, loading, refresh } = useSearch();

const isModalOpened: Ref<boolean> = ref(false);
const handleOpenModal = (isOpenModal: boolean) =>
  (isModalOpened.value = isOpenModal);
const handleCloseModal = (isCloseModal: boolean) => {
  isModalOpened.value = isCloseModal;
  results.value = [];
  searchQuery.value = "";
};

const contentModalClass: ComputedRef<string> = computed<string>(() =>
  isMobile ? "pt-2" : "overflow-y-auto pt-4",
);

useSeo({
  title: "Société Astronomique de Montpellier",
  description: "À la découverte du ciel",
  image: undefined,
});
</script>

<template>
  <div>
    <Header
      :is-home="true"
      :menu="menuNavigation"
      :open-modal="!isModalOpened"
      @open-search-modal="handleOpenModal"
    />
    <div class="flex-fill">
      <slot />
    </div>
    <Modal
      v-if="isModalOpened"
      :is-open="isModalOpened"
      @close-modal="handleCloseModal"
    >
      <template #header>{{ t("search.title") }}</template>
      <template #content>
        <div class="relative p-3 border border-gray-200 rounded-lg w-full">
          <input
            v-model="searchQuery"
            type="search"
            class="rounded-md p-1 w-full focus:outline-none focus:focus-none"
            :placeholder="$t('search.placeholder')"
          />
        </div>

        <!-- Query Results -->
        <div
          v-if="searchQuery"
          :class="`${contentModalClass} h-64 border-t border-gray-200 `"
        >
          <p v-if="loading">{{ t("layout.loading") }}</p>
          <p v-if="!loading && results !== null && 0 === results?.length">
            {{ t("search.no_result") }}
          </p>
          <div v-if="!loading && results !== null && 0 < results?.length">
            <p class="text-justify text-base leading-8 mt-2 my-2">
              {{ results?.length }} résultats trouvés:
            </p>
            <ul class="p-6 divide-y divide-slate-200">
              <li
                v-for="result in results"
                :key="result.id"
                class="flex py-4 first:pt-0 last:pb-0 hover:border-indigo-500"
              >
                <!-- Create search list card -->
                <prismic-link :field="result" class="my-1">
                  <!--                  <img class="h-10 w-10 rounded-full" :src="result?.data?.image_vignette.mobile" alt="" />-->
                  <div class="ml-3 overflow-hidden">
                    <p class="text-sm font-medium text-slate-900">
                      {{ result?.data?.title }}
                    </p>
                  </div>
                </prismic-link>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Modal>
    <SideMenu />
    <Footer :menu="menuNavigation" />
  </div>
</template>

<style scoped></style>
