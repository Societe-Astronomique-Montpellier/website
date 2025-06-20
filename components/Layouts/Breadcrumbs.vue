<script setup lang="ts">
import type {
  EventDocument,
  EventsDocument,
  PageArticleDocument,
  PageEditorialeDocument,
  PageThematiqueDocument,
} from "~/prismicio-types";

const prismic = usePrismic();
const lang = useLang();

export interface IProps {
  currentUid: string;
  listIds: Array<string>;
}

const props = defineProps<IProps>();
const { currentUid, listIds } = toRefs(props);

const { data: items } = await useAsyncData(
  "items",
  async () =>
    await prismic.client.getAllByIDs<
      | EventsDocument
      | PageThematiqueDocument
      | PageArticleDocument
      | EventDocument
      | PageEditorialeDocument
    >(listIds.value, { lang: lang.value }),
);
</script>

<template>
  <nav class="flex flex-wrap gap-2 p-2" aria-label="Breadcrumb">
    <ol
      class="inline-flex items-center space-x-1 py-2 md:space-x-2 rtl:space-x-reverse"
    >
      <li class="inline-flex items-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-slate-300"
        >
          <Icon name="material-symbols-light:home" size="20" class="me-2.5" />
          {{ $t("layout.home") }}
        </NuxtLink>
      </li>
      <li v-for="(item, index) in items" :key="index">
        <div class="flex items-center">
          <Icon
            name="material-symbols:arrow-forward-ios-rounded"
            class="text-gray-700 dark:text-gray-500"
            size="16"
          />
          <prismic-link
            v-if="currentUid !== item.uid"
            :field="item"
            class="ms-1 inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-500"
            :aria-label="item.data.title"
          >
            <span
              v-if="item"
              class="ms-1 text-sm font-medium text-gray-700 dark:text-gray-500 md:ms-2"
            >
              {{ item.data.title }}
            </span>
          </prismic-link>
          <span
            v-else-if="currentUid === item.uid"
            class="ms-1 inline-flex items-center text-sm font-bold md:ms-2 text-indigo-700 dark:text-indigo-400"
          >
            {{ item.data.title }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped></style>
