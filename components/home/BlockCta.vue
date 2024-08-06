<script setup lang="ts">
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
const richTextSerializer = useRichTextSerializer();

const { isMobile, isDesktop } = useDevice();
</script>

<template>
  <div class="lg:px-2 lg:py-20 py-0 w-full flex justify-center">
		<div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
			<div class="lg:w-1/2" v-if="isDesktop">
				<div class="lg:scale-110 lg:h-full h-100 bg-cover rounded-b-none border lg:rounded-lg"
					:style="{ backgroundImage: `url(${block.data.image?.url})` }">
				</div>
			</div>
			<div class="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
				<h2 class="text-3xl text-gray-800 font-bold">
          {{ block.data.title }}
					<span class="text-indigo-600">
            {{ block.data.subtitle }}
          </span>
				</h2>
				<div class="mt-4 text-gray-600">
          <prismic-rich-text
              :field="block.data.resume" :serializer="richTextSerializer" />
				  <prismic-rich-text
              :field="block.data.content" :serializer="richTextSerializer" />
				</div>
				<div v-if="true === block.data.display_button_link" class="mt-8 flex justify-center">
          <NuxtLink
            :to="block.data.link.url"
            target="_blabk"
          >
            <button
                type="button"
                data-twe-ripple-init
                data-twe-ripple-color="light"
                :aria-label="t('layout.moreInfo')"
                class="md:justify-center inline-block rounded bg-gray-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              {{ $t('layout.moreInfo') }}
            </button>
          </NuxtLink>

				</div>
			</div>
      <ImageCopyright :image="block.data.image" v-if="isMobile" />
		</div>
	</div>
</template>
