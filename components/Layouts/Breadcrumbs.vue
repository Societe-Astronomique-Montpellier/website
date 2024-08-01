<script setup lang="ts">
import type {
  AllDocumentTypes,
  EventDocument,
  EventsDocument,
  PageArticleDocument,
  PageThematiqueDocument
} from "~/prismicio-types";

const prismic = usePrismic();
const isCurrent: Ref<boolean> = ref(false);

export interface IProps {
  currentUid: string
  listIds: Array<string>
}

const props = defineProps<IProps>()
const { currentUid, listIds } = toRefs(props)

const { data: items, error } = await useAsyncData(
  'items',
  async () => await prismic.client.getAllByIDs<EventsDocument | PageThematiqueDocument | PageArticleDocument | EventDocument>(listIds.value, {'lang': 'fr-fr'})
)

</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 py-3 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-700">
          <Icon name="material-symbols-light:home" size="20" class="me-2.5" />
          {{ $t('layout.home') }}
        </NuxtLink>
      </li>
      <li v-for="(item, index) in items" :key="index"
      >
        <div class="flex items-center">
          <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-gray-700" size="16" />
          <prismic-link
            :field="item"
            class="ms-1 inline-flex items-center text-sm font-medium text-gray-700"
            v-if="currentUid !== item.uid"
          >
            <span class="ms-1 text-sm font-medium text-gray-700 md:ms-2" v-if="item">
              {{ item.data.title }}
            </span>
          </prismic-link>
          <span v-else-if="currentUid === item.uid" class="ms-1 inline-flex items-center text-sm font-medium md:ms-2 text-indigo-500 dark:text-indigo-500">
            {{ item.data.title }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped>

</style>