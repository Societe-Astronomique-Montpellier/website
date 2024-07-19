<script setup lang="ts">
import type {LatLng, LatLngExpression, MapOptions, Point, PointExpression} from "leaflet";

// Props
export interface Props {
  marker: [number, number] | null
}

const props = defineProps<Props>()
const { marker } = toRefs(props)

// Get default center coordinates
import { useCoordinates } from "@/composables/useCoordinates";
const centerMap = useCoordinates('babotte'); // (null !== marker) ? marker : useCoordinates('babotte');
</script>

<template>
  <div class="mx-auto py-4">
    <LMap
        style="height: 700px"
        :zoom="18"
        :center="centerMap as PointExpression"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="centerMap as LatLngExpression" />
    </LMap>
  </div>
</template>

<style scoped>

</style>