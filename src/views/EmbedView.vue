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
</script>

<template>
    <main class="map-embedded">
    <Polygon :center="estate.cityCenter" :features="estate.cityGeometry"/>
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