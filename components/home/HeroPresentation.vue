<script setup lang="ts">
export interface Props {
  id: string,
  type: string
}

const props = defineProps<Props>()

const { id } = toRefs(props)
const { type } = toRefs(props)

const { client } = usePrismic();
const { data: block } = await useAsyncData("block", () => client.getByID(id.value))


const getHeight = () => (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)+64;
</script>

<template>
  <v-parallax
    cover
    
    :height="getHeight()"
  >
    <v-row
      class="w-auto fill-height"
      align="center"
      justify="center"
    >
      <div class="text-h2">
        <h2></h2>
        <h1> {{ data }}</h1>
      </div>  
    </v-row>
  </v-parallax>
</template>

<style scoped>

</style>
