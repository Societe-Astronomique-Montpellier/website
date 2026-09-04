<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker, DivIcon, LatLngExpression } from "leaflet";

const zoom: Ref<number> = ref<number>(16);

export interface IProps {
  itemMarker: [number, number];
}
const props = defineProps<IProps>();
const { itemMarker } = toRefs(props);

const mapContainer = ref<HTMLElement | null>(null);
let map: LeafletMap | null = null;
let marker: Marker | null = null;

onMounted(async () => {
  const L = await import("leaflet");

  if (!mapContainer.value) return;

  map = L.map(mapContainer.value).setView(itemMarker.value, zoom.value);

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: zoom.value,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    className: "map-tiles",
  }).addTo(map);

  const markerIconFixed: DivIcon = L.divIcon({
    className: "bg-transparent",
    html: `<div class="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  marker = L.marker(itemMarker.value, { icon: markerIconFixed }).addTo(map);
});

watch(itemMarker, (newCoords: LatLngExpression) => {
  if (!map || !marker) return;

  marker.setLatLng(newCoords);
  map.setView(newCoords, zoom.value);
});

onUnmounted(() => {
  map?.remove();
  map = null;
  marker = null;
});
</script>

<template>
  <div class="mx-auto py-4 z-0">
    <client-only>
      <div
        ref="mapContainer"
        class="h-[650px] rounded-lg border border-white/10 relative overflow-hidden shadow-inner group"
      ></div>
    </client-only>
  </div>
</template>

<style scoped></style>