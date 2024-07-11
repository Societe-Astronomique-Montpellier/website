<script setup lang="ts">
 // add header + footer
const Header = defineAsyncComponent(() => import('@/components/Layouts/Header.vue'))
const Copyright = defineAsyncComponent(() => import('@/components/Layouts/Copyright.vue'))
</script>

<template>
  <Header />
  <v-main class="main-container">
    <div class="flex-fill">
      <slot />
    </div>
  </v-main>
  <Copyright />
</template>

<style scoped>

</style>