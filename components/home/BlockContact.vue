<script setup lang="ts">
import type { AllDocumentTypes, BlockContactDocument } from "~/prismicio-types";

export interface IProps {
  block: any;
}
const props = defineProps<IProps>();
const { block } = toRefs(props);

const prismic = usePrismic();
const { data: block_contact } = useAsyncData(
  async () =>
    (await prismic.client.getByUID<AllDocumentTypes>(
      "block_contact",
      block.value.uid,
    )) as BlockContactDocument,
);

const Map = defineAsyncComponent(() => import("@/components/content/Map.vue"));

const centerMap: [number, number] = useCoordinates("babotte");
const richTextSerializer = useRichTextSerializer();
</script>

<template>
  <section v-show="block" class="bg-gray-100 dark:bg-slate-800">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div class="max-w-2xl lg:max-w-4xl mx-auto text-center">
        <h3 class="text-3xl font-extrabold text-gray-800 dark:text-slate-400">
          {{ block.data.title }}
        </h3>
        <div class="mt-4 text-lg text-gray-600 dark:text-slate-300">
          <prismic-rich-text
            :field="block.data.subtitle"
            :serializer="richTextSerializer"
          />
        </div>
      </div>
      <div class="mt-8 lg:mt-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="rounded-lg overflow-hidden z-0">
            <Map :item-marker="centerMap" />
          </div>
          <div>
            <div
              class="max-w-full mx-auto rounded-lg overflow-hidden text-gray-600 dark:text-slate-300"
            >
              <prismic-rich-text
                v-if="block_contact"
                :field="block_contact.data.content"
                :serializer="richTextSerializer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
