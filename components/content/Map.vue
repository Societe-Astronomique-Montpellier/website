<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const zoom: Ref<number> = ref<number>(18);
const zIndex: Ref<number> = ref<number>(20);

// Props
export interface IProps {
  itemMarker: [number, number];
}
const props = defineProps<IProps>();
const { itemMarker } = toRefs(props);
</script>

<template>
  <div class="mx-auto py-4 z-0">
    <client-only>
      <l-map
        ref="map"
        v-model:zoom="zoom"
        style="height: 700px"
        :use-global-leaflet="false"
        :center="itemMarker"
      >
        <l-tile-layer
          v-model:z-index="zIndex"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :lat-lng="itemMarker"> </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<style scoped></style>
