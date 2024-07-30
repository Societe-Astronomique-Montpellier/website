<script setup lang="ts">

import type {AllDocumentTypes, BlockContactDocument} from "~/prismicio-types";

export interface IProps {
  block: any
}
const props = defineProps<IProps>()
const { block } = toRefs(props)

const prismic = usePrismic()
const {data: block_contact} = useAsyncData(
  async () => await prismic.client.getByUID<AllDocumentTypes>('block_contact', block.value.uid) as BlockContactDocument
)

const Map = defineAsyncComponent(() => import('@/components/content/Map.vue'));

import { useCoordinates } from "@/composables/useCoordinates";
const centerMap: [number, number] = useCoordinates('babotte');

import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
const richTextSerializer = useRichTextSerializer();

</script>

<template>
  <section class="bg-gray-100" v-if="block">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div class="max-w-2xl lg:max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-gray-800">{{ block.data.title }}</h2>
        <div class="mt-4 text-lg text-gray-600">
          <prismic-rich-text
              :field="block.data.subtitle" :serializer="richTextSerializer" />
        </div>
      </div>
      <div class="mt-8 lg:mt-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="rounded-lg overflow-hidden">
            <Map
              :itemMarker="centerMap"
            />
          </div>
          <div>
            <div class="max-w-full mx-auto rounded-lg overflow-hidden text-gray-600">
              <prismic-rich-text
                  :field="block_contact.data.content" :serializer="richTextSerializer" v-if="block_contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>