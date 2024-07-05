<script setup lang="ts">
const ThematicCard = defineAsyncComponent(() => import('@/components/content/ThematicCard.vue'))

</script>

<template>
  <v-sheet
      color="#F2F5F8"
      elevation="0"
      class="mx-auto landing-warpper text-left"
      rounded
  >
    <v-sheet
        elevation="0"
        color="transparent"
        max-width="1600 "
        class="mx-auto my-10"
    >
      <v-item-group selected-class="active-card">
        <v-container>
          <v-row align="stretch">
            <v-col
              v-for="(i, index) in 3"
              :key="index"
              cols="12"
              md="4"
            >
              <ThematicCard />
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-sheet>
  </v-sheet>
</template>

<style scoped>

</style>