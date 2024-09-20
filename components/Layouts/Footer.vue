<script setup lang="ts">
import type { LinkField } from "@prismicio/client";
import { PrismicLink } from "@prismicio/vue";
const runtimeConfig = useRuntimeConfig();

const Copyright = defineAsyncComponent(
  () => import("@/components/Layouts/Copyright.vue"),
);

const props = withDefaults(defineProps<{ menu: any }>(), {
  menu: null,
});
const { menu } = toRefs(props);
</script>

<template>
  <footer
    class="py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8 text-center bg-gray-900"
  >
    <nav
      class="flex flex-wrap justify-center mx-6 pt-8 pb-4 text-gray-400"
      aria-label="navigation footer"
    >
      <div
        v-for="(item, index) in menu?.data.footer_navigation"
        :key="index"
        class="px-5 py-2"
        role="menubar"
      >
        <prismic-link
          :field="item.link_footer as LinkField"
          role="menuitem"
          class="text-base leading-6"
          :aria-label="item.label_footer"
        >
          {{ item.label_footer }}
          <span
            class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"
          ></span>
          <span
            class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"
          ></span>
        </prismic-link>
      </div>
    </nav>
    <div class="flex justify-center mt-8 space-x-6">
      <a
        :href="runtimeConfig.public.facebookSam"
        class="text-gray-400 hover:text-gray-500"
        target="_blank"
        aria-label="facebook"
      >
        <span class="sr-only">Facebook</span>
        <Icon name="ic:baseline-facebook" size="24" />
      </a>
      <a
        :href="runtimeConfig.public.instagramSam"
        class="text-gray-400 hover:text-gray-500"
        target="_blank"
        aria-label="instagram"
      >
        <span class="sr-only">Instagram</span>
        <Icon name="mdi:instagram" size="24" />
      </a>
      <a
        :href="runtimeConfig.public.twitterSam"
        class="text-gray-400 hover:text-gray-500"
        target="_blank"
        aria-label="x.com"
      >
        <span class="sr-only">X.com</span>
        <Icon name="hugeicons:new-twitter" size="24" />
      </a>
      <a
        :href="runtimeConfig.public.youtubeSam"
        class="text-gray-400 hover:text-gray-500"
        target="_blank"
        aria-label="youtube"
      >
        <span class="sr-only">Youtube</span>
        <Icon name="mdi:youtube" size="24" />
      </a>
      <a
        :href="runtimeConfig.public.githubSam"
        class="text-gray-400 hover:text-gray-500"
        target="_blank"
        aria-label="github"
      >
        <span class="sr-only">GitHub</span>
        <Icon name="mdi:github" size="24" />
      </a>
    </div>
  </footer>
  <Copyright />
</template>

<style scoped></style>
