<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router';
import { estateStore } from '@/stores/estate'

const route = useRoute()
const estate = estateStore()
const city = route.params.city || route.meta.city as string

await estate.getGeometry(city)

const Polygon = defineAsyncComponent(() => 
  import('@/components/Polygon.vue')
)
function handleAlertClose() {
  console.log('nope')
}
</script>

<template>
  <main class="map-embedded">
    <Polygon :center="estate.cityCenter" :features="estate.cityGeometry"/>
  </main>
</template>


<style>
html {
  overflow-y: hidden;
}
.map-embedded {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.actions {
  overflow: auto;
  margin: 0 1rem;
  height: 50%;
}
.discuss {
  width: 98vw - 2rem;
  margin: 0 1rem;
}
</style>