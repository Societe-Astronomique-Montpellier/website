<script setup lang="ts">
import type {ComputedRef} from "vue";

const { t } = useI18n()
// source https://tailwindflex.com/@noah/call-to-action-card-with-image
const ImageCopyright = defineAsyncComponent(() => import('@/components/Layouts/imageCopyright.vue'))

export interface Props {
  block: any
}
const props = defineProps<Props>()
const { block } = toRefs(props)

// RichText serializer
import { useRichTextSerializer } from '@/composables/useRichTextSerializer'
import type {ImageField} from "@prismicio/client";
const richTextSerializer = useRichTextSerializer();

const { isMobile, isDesktop } = useDevice();
const optimizedImage: ComputedRef<ImageField> = computed<ImageField>(() => isMobile ? block?.value.data.image?.mobile : block?.value.data.image)
</script>

<template>
  <div class="lg:px-2 lg:py-20 py-0 w-full flex justify-center">
		<div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
			<div class="lg:w-1/2" v-if="isDesktop">
				<div class="lg:scale-110 lg:h-full h-100 bg-cover rounded-b-none border lg:rounded-lg"
					:style="{ backgroundImage: `url(${optimizedImage?.url})` }">
				</div>
			</div>
			<div class="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
				<h3 class="text-3xl text-gray-800 font-bold">
          {{ block.data.title }}
					<span class="text-indigo-600">
            {{ block.data.subtitle }}
          </span>
				</h3>
				<div class="mt-4 text-gray-600">
          <prismic-rich-text
            :field="block.data.resume" :serializer="richTextSerializer" />
				  <prismic-rich-text
            :field="block.data.content" :serializer="richTextSerializer" />
				</div>
				<div v-if="true === block.data.display_button_link" class="mt-8 flex justify-center">
          <NuxtLink
            :to="block.data.link.url"
            target="_blank"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            :aria-label="t('layout.moreInfo')"
            type="button"
            class="px-3 py-2.5 text-2sm font-medium text-white inline-flex items-center bg-gray-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center m-1"
          >
              {{ $t('layout.moreInfo') }}
          </NuxtLink>

				</div>
			</div>
      <ImageCopyright :image="optimizedImage" v-if="isMobile" />
		</div>
	</div>
</template>
