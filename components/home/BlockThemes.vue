<script setup lang="ts">

export interface Props {
  block:  undefined,
  title: string
}

const props = defineProps<Props>()
const { title } = toRefs(props)

</script>

<template>
  <div class="container my-24 px-6 mx-auto" v-if="true">
    <section class="mb-32 text-gray-800">
      <h3 class="text-3xl font-bold mb-12 text-center">{{ title }}</h3>
      <div class="grid lg:grid-cols-3 gap-6">

      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
