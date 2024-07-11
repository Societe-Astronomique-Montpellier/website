<script setup lang="ts">
const route = useRoute()

  // add shere button + top
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
</script>

<template>
  <v-main class="main-container font-sans">
    <div class="flex-fill">
      <slot />
    </div>
  </v-main>
  <Copyright />
</template>

<style scoped>

</style>