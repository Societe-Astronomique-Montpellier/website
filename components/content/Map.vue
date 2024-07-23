<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

import { useCoordinates } from "@/composables/useCoordinates";
const centerMap = useCoordinates('babotte') as [number, number];
const zoom: Ref<number> = ref(18);

// Props
export interface IProps {
  itemMarker: [number, number]
}
const props = defineProps<IProps>()
const { itemMarker } = toRefs(props)

</script>

<template>
  <div class="mx-auto py-4">
    <client-only>
      <l-map
          style="height: 700px"
          :useGlobalLeaflet="false"
          ref="map"
          v-model:zoom="zoom"
          :center="itemMarker"
      >
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker
          :lat-lng="itemMarker"
        >
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<style scoped>

</style>