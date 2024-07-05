<script setup lang="ts">
export interface Props {
  id: string
}

const props = defineProps<Props>()

const { id } = toRefs(props)

import type { IPrismicDocument } from '@/types/prismic'

const { client } = usePrismic();
const { data: blockCta, pending, error } = await useAsyncData(
  "blockCta",
  (): Promise<IPrismicDocument> => client.getByID(id.value, {lang: 'fr-fr'})
);
</script>
<template>
	<div class="px-2 py-20 w-full flex justify-center" v-if="blockCta">
		<div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
			<div class="lg:w-1/2">
				<div class="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg"
					:style="{ backgroundImage: `url(${blockCta.data.image.url})` }">
				</div>
			</div>
			<div class="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
				<h2 class="text-3xl text-gray-800 font-bold">
					{{ blockCta.data.title[0].text }}
					<span class="text-indigo-600">{{ blockCta.data.subtitle[0].text }}</span>
				</h2>
				<div class="mt-4 text-gray-600">
				  <prismic-rich-text :field="blockCta.data.content" />
				</div>
				<div class="mt-8">
					<a :href="blockCta.data.link.url" class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded">Site officiel</a>
				</div>
			</div>
		</div>
	</div>
</template>
