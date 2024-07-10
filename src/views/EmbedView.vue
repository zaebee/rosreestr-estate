<script setup lang="ts">

import { useRoute } from 'vue-router';
import { onBeforeMount, onServerPrefetch } from 'vue'

import { estateStore } from '@/stores/estate'

import { defineAsyncComponent } from 'vue'

const route = useRoute();
const estate = estateStore()
const city = route.params.city || route.meta.city as string

onServerPrefetch(() => {
  estate.getGeometry(city)//.then(initYmaps)
  //  initYmaps()
})
onBeforeMount(() => {
  estate.getGeometry(city)//.then(initYmaps)
  //initYmaps()
})
const Polygon = defineAsyncComponent(() =>
  import('../components/Polygon.vue')
)
</script>

<template>
  <main class="map-embedded">
    <Polygon />
  </main>

</template>


<style>
html {
  overflow-y: auto;
}
.map-embedded {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>