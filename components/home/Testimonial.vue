<script setup lang="ts">
import type {IPrismicDocument} from "~/types/prismic";

export interface Props {
  id: string
}
const props = defineProps<Props>()
const { id } = toRefs(props)

const { client } = usePrismic();
const { data: blockTestimonial, pending, error } = await useAsyncData(
    "blockTestimonial",
    (): Promise<IPrismicDocument> => client.getByID(id.value, {lang: 'fr-fr'})
);
</script>

<template>
  <div v-if="blockTestimonial">
    <v-sheet
        elevation="0"
        class="mx-auto landing-warpper"
        color="white"
    >
      <v-sheet
        color="white"
        elevation="0"
        max-width="2100"
        class="mx-auto pa-5"
      >
        <v-container
            color="grey"
        >
          <v-sheet
            color="grey"
            elevation="0"
            rounded-xl
          >
            <v-row
              align="center"
              justify="center"
            >
              <v-col
                cols="2"
                lg="2"
              >
                <v-avatar size="200" class="mr-4">
                  <v-img
                      :src="blockTestimonial.data.image.url"
                      width="200"
                  />
                </v-avatar>
              </v-col>
              <v-col
                  cols="10"
                  lg="10"
                  style="align-self: baseline;"
              >
                <h3 class="text-h4 font-weight-regular text-center">
                  <prismic-text :field="blockTestimonial.data.content" wrapper="p" />
                </h3>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
      </v-sheet>
    </v-sheet>

<!--    <v-img-->
<!--      :src="blockTestimonial.data.image.url"-->
<!--    />-->

  </div>
</template>

<style scoped>

</style>