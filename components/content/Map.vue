<script setup lang="ts">
import type {LatLng, MapOptions} from "leaflet";
import { Map, TileLayer, Marker } from 'leaflet';

// Props
// export interface Props {
//   marker: LatLng
// }

// const props = defineProps<Props>()
// const { marker } = toRefs(props)

// Get default center coordinates
import { useCoordinates } from "@/composables/useCoordinates";
const centerMap = useCoordinates('babotte');

// const map = ref(null)
// const mapInstance = L.Map('map').setView(centerMap, 13);
//
// TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(mapInstance);

</script>

<template>
  <div class="mx-auto" style="min-height: 500px;">
    <LMap
        ref="map"
        :zoom="12"
        :max-zoom="18"
        :center="centerMap"
        style="height: 100%"
    >
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
      />
<!--      <LMarker v-if="marker" :lat-lng="marker" />-->
    </LMap>
  </div>
</template>

<style scoped>

</style>