<script setup lang="ts">

import type {BlockCtaDocument, BlockCtaDocumentData} from "~/prismicio-types";

export interface Props {
  block: any
}
const props = defineProps<Props>()
const { block } = toRefs(props)
</script>
<template>
  <div class="px-2 py-20 w-full flex justify-center" v-if="block">
		<div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
			<div class="lg:w-1/2">
				<div class="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg"
					:style="{ backgroundImage: `url(${block.data.image?.url})` }">
				</div>
			</div>
			<div class="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
				<h2 class="text-3xl text-gray-800 font-bold">
          <prismic-text :field="block.data.title" />
<!--          <prismic-text :field="block.data.title" />-->
					<span class="text-indigo-600">
            <prismic-rich-text :field="block.data.subtitle" />
          </span>
				</h2>
				<div class="mt-4 text-gray-600">
          <prismic-rich-text :field="block.data.resume" />
				  <prismic-rich-text :field="block.data.content" />
				</div>
				<div v-if="true === block.display_button_link" class="mt-8">

          <pre>{{ block.data.link }}</pre>

				</div>
			</div>
		</div>
	</div>
</template>
