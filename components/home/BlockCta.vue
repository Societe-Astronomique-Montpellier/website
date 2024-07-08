<script setup lang="ts">
import type {IBlock} from "@/types/block";

export interface Props {
  data: IBlock
}

const props = defineProps<Props>()
const { data } = toRefs(props)
</script>
<template>
  <pre>{{ data }}</pre>
	<div class="px-2 py-20 w-full flex justify-center" v-if="data">
		<div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
			<div class="lg:w-1/2">
				<div class="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg"
					:style="{ backgroundImage: `url(${data.image?.url})`, backgroundRepeat: 'no-repeat' }">
				</div>
			</div>
			<div class="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg">
				<h2 class="text-3xl text-gray-800 font-bold">
          <prismic-text :field="data.title" />
					<span class="text-indigo-600">
            <prismic-text :field="data?.subtitle" />
          </span>
				</h2>
				<div class="mt-4 text-gray-600">
          <prismic-rich-text :field="data.resume" />
				  <prismic-rich-text :field="data.content" />
				</div>
				<div v-if="true === data.showButton" class="mt-8">

          <pre>{{ data.link }}</pre>

				</div>
			</div>
		</div>
	</div>
</template>
