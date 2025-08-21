<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import { PrismicLink } from "@prismicio/vue";
import type { LinkField } from "@prismicio/client";

const { t } = useI18n();
const { isMobile } = useDevice();
const { searchQuery, results, loading } = useSearch();

const props = withDefaults(defineProps<{ isHome?: boolean; menu?: any }>(), {
  isHome: false,
  menu: null,
});
const { isHome, menu } = toRefs(props);
const isOpen: Ref<boolean> = ref(false);
const openSearch: Ref<boolean> = ref(false);
const inputSearchText: Ref<HTMLInputElement | null> = ref(null);

const HeaderNavItem = defineAsyncComponent(
  () => import("@/components/Layouts/HeaderNavItem.vue"),
);
const ListResults = defineAsyncComponent(
  () => import("@/components/Layouts/ListResults.vue"),
);

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 27 && isOpen.value) isOpen.value = false;
  });
});

watch(
  () => isOpen.value,
  (isOpen) => {
    if (import.meta.client) {
      if (isOpen) document.body.style.setProperty("overflow", "hidden");
      else document.body.style.removeProperty("overflow");
    }
  },
  {
    immediate: true,
  },
);

const SwitchLightDarkMode = defineAsyncComponent(
  () => import("@/components/Layouts/SwitchLightDarkMode.vue"),
);

const drawer = () => (isOpen.value = !isOpen.value);

const openSearchBar = async () => {
  openSearch.value = !openSearch.value;
  await nextTick();
  inputSearchText.value?.focus();
};

const closeSearchBar = () => {
  openSearch.value = !openSearch.value;
  searchQuery.value = "";
  results.value = [];
};

const mainNavClass: ComputedRef<string> = computed<string>(() =>
  isHome.value
    ? "fixed bg-slate-800/50"
    : "sticky bg-white dark:bg-slate-950/70",
);
const subNavClass: ComputedRef<string> = computed<string>(() =>
  isHome.value
    ? "lg:px-auto absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 hidden md:flex md:items-center md:w-auto bg-slate-800/50 text-grey-700"
    : "hidden md:flex md:items-center md:w-auto w-full",
);
const navItemsColors: ComputedRef<string> = computed<string>(() =>
  isHome.value ? "text-gray-300" : "text-gray-700 dark:text-gray-500",
);
const searchIconColors: ComputedRef<string> = computed<string>(() =>
  isHome.value ? "text-gray-300" : "text-gray-700 dark:text-gray-500",
);
</script>

<template>
  <header :class="`w-full py-2 top-0 z-50 backdrop-blur-sm ${mainNavClass}`">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" aria-label="home">
            <prismic-image
              v-if="menu.data.logo.menu"
              :field="menu?.data.logo.menu"
              class="h-14 w-auto"
              :alt="t('layout.title')"
              loading="lazy"
              :title="t('layout.title')"
              :aria-label="t('layout.title')"
              :width="menu?.data.logo.menu.dimensions?.width"
            />
          </NuxtLink>
        </div>

        <!-- menu -->
        <nav
          class="hidden md:flex space-x-8"
          aria-label="navigation"
          role="navigation"
        >
          <prismic-link
            v-for="(item, index) in menu?.data.header_navigation"
            :key="index"
            :field="item.link_header as LinkField"
            role="menuitem"
            :class="`${navItemsColors} py-2 rounded-md text-xl font-medium relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-indigo-700 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center`"
            :title="item.label_header"
            :aria-label="item.label_header"
          >
            <span class="px-4">{{ item.label_header }}</span>
          </prismic-link>

          <NuxtLink
            to="/contact"
            type="button"
            :aria-label="t('layout.header.btnContact')"
            role="menuitem"
            class="px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200 text-white inline-flex items-center bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            {{ $t("layout.header.btnContact") }}
          </NuxtLink>
        </nav>

        <!-- Right items -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <button
            type="button"
            class="p-2 rounded-full h-16 text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors duration-200"
            :aria-label="t('search.title')"
            role="button"
            @click="openSearchBar"
          >
            <Icon
              name="material-symbols-light:search"
              :class="`${searchIconColors}`"
              size="32"
            />
          </button>

          <!-- Swith light/dark -->
          <SwitchLightDarkMode />

          <button
            aria-label="Menu"
            class="md:hidden p-2 rounded-full transition-colors"
            @click="isOpen = !isOpen"
          >
            <Icon
              v-if="!isOpen"
              name="material-symbols-light:menu-rounded"
              size="24"
              class="dark:text-gray-300 text-gray-700"
            />
            <Icon
              v-if="isOpen"
              name="material-symbols-light:close-rounded"
              size="24"
              class="dark:text-gray-300 text-gray-300"
            />
          </button>
        </div>
      </div>

      <div class="md:hidden py-4"></div>
    </div>

    <!-- Search -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-40 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="max-h-40 opacity-100"
      leave-to-class="max-h-0 opacity-0"
      :class="`absolute top-full left-0 right-0 ${mainNavClass} shadow-lg`"
    >
      <div
        v-if="openSearch"
        :class="`w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 `"
      >
        <div class="relative">
          <input
            ref="inputSearchText"
            v-model="searchQuery"
            autofocus
            type="search"
            class="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('search.placeholder')"
          />
          <button
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            @click="closeSearchBar"
          >
            <Icon name="material-symbols-light:close-rounded" class="h-5 w-5" />
          </button>
          <div v-if="searchQuery" class="mt-4 max-h-96 overflow-y-auto">
            <p v-if="loading">{{ t("layout.loading") }}</p>
            <p v-if="!loading && results !== null && 0 === results?.length">
              {{ t("search.no_result") }}
            </p>
            <div v-if="!loading && results && 0 < results?.length">
              <ListResults :items="results" :nb-items="results?.length" />
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile -->
    <div
      v-if="isOpen"
      class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <prismic-link
          v-for="(item, index) in menu?.data.header_navigation"
          :key="index"
          :field="item.link_header as LinkField"
          role="menuitem"
          :class="`${navItemsColors} block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200`"
          :title="item.label_header"
          :aria-label="item.label_header"
        >
          {{ item.label_header }}
        </prismic-link>
      </div>
    </div>
  </header>

  <nav
    v-show="false"
    :class="`lg:px-8 px-2 w-full shadow-sm top-0 z-50 sticky ${mainNavClass}`"
  >
    <div class="flex items-center justify-between relative">
      <!-- Header logo -->
      <div v-if="!isMobile && !isHome" class="">
        <NuxtLink to="/" aria-label="home">
          <prismic-image
            v-if="menu.data.logo.menu"
            :field="menu?.data.logo.menu"
            class="mr-3 h-16 rounded-full border dark:border-slate-600/60"
            :alt="t('layout.title')"
            loading="lazy"
            :title="t('layout.title')"
            :aria-label="t('layout.title')"
            :width="menu?.data.logo.menu.dimensions?.width"
            :height="menu?.data.logo.menu.dimensions?.height"
          />
        </NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <div v-if="isMobile" class="md:hidden relative">
        <button
          type="button"
          name="openMenu"
          aria-label="openMenu"
          class="left-0"
          @click="drawer"
        >
          <svg
            class="h-8 w-8 fill-current text-gray-900 mt-1"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <button type="button" class="right-0" :aria-label="t('search.title')">
          <Icon name="material-symbols-light:search" size="32" />
        </button>

        <SwitchLightDarkMode v-if="isMobile" />
      </div>

      <!-- Navbar -->
      <nav v-if="!isMobile" :class="subNavClass" aria-label="navigation">
        <ul
          :class="`md:flex items-center gap-5 justify-between text-base text-gray-300 pt-4 md:pt-0`"
          role="menubar"
        >
          <HeaderNavItem
            v-for="(item, index) in menu?.data.header_navigation"
            :key="index"
          >
            {{ item.label_header }}
            <span
              class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"
            ></span>
            <span
              class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"
            ></span>
          </HeaderNavItem>
        </ul>
      </nav>

      <!-- Dark Background Transition -->
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isOpen"
          v-if="isMobile"
          class="z-10 fixed inset-0 transition-opacity"
          @keydown.esc="isOpen = false"
        >
          <div
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
            @click="isOpen = false"
          ></div>
        </div>
      </transition>

      <!-- Drawer Menu -->
      <aside
        v-if="isMobile"
        class="p-5 transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
        role="region"
      >
        <div class="close">
          <button
            class="absolute top-0 right-0 mt-4 mr-4"
            type="button"
            aria-label="Close"
            @click="isOpen = false"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav aria-label="menu-responsive">
          <ul class="divide-y" role="menubar">
            <NuxtLink
              to="/"
              :aria-label="t('layout.home')"
              type="button"
              class="my-4 inline-block"
              role="menuitem"
            >
              {{ $t("layout.home") }}
            </NuxtLink>

            <li
              v-for="(item, index) in menu?.data.header_navigation"
              :key="index"
              role="none"
              @click="isOpen = false"
            >
              <prismic-link
                :field="item.link_header as LinkField"
                class="my-4 inline-block"
                role="menuitem"
                :aria-label="item.label_header"
              >
                {{ item.label_header }}
              </prismic-link>
            </li>

            <NuxtLink
              to="/contact"
              :aria-label="t('layout.header.btnContact')"
              type="button"
              class="justify-center px-3 py-2.5 text-2sm font-medium text-white inline-flex items-center bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center m-1 w-full md:w-auto"
              role="menuitem"
            >
              {{ $t("layout.header.btnContact") }}
            </NuxtLink>
          </ul>
        </nav>
        <!--        <div class="follow">-->
        <!--          <p class="italic font-sans text-sm">follow us:</p>-->
        <!--          <div class="social flex space-x-5 mt-4 ">-->
        <!--            <a href="#" aria-label="twitter">-->
        <!--              <svg-->
        <!--                  aria-hidden="true" focusable="false"-->
        <!--                  data-prefix="fab" data-icon="twitter"-->
        <!--                  class="h-5 w-5 fill-current text-gray-600" role="img"-->
        <!--                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">-->
        <!--                <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>-->
        <!--              </svg>-->
        <!--            </a>-->
        <!--            <a href="#" aria-label="facebook">-->
        <!--              <svg-->
        <!--                  aria-hidden="true" focusable="false"-->
        <!--                  data-prefix="fab" data-icon="facebook-f"-->
        <!--                  class="h-5 w-5 fill-current text-gray-600" role="img"-->
        <!--                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">-->
        <!--                <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>-->
        <!--              </svg>-->
        <!--            </a>-->
        <!--            <a href="#" aria-label="instagram">-->
        <!--              <svg-->
        <!--                  aria-hidden="true" focusable="false"-->
        <!--                  data-prefix="fab" data-icon="instagram"-->
        <!--                  class="h-5 w-5 fill-current text-gray-600" role="img"-->
        <!--                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">-->
        <!--                <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>-->
        <!--              </svg>-->
        <!--            </a>-->
        <!--          </div>-->
        <!--        </div>-->
      </aside>
    </div>
  </nav>
</template>

<style scoped></style>
