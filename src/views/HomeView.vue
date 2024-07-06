<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, defineAsyncComponent, onServerPrefetch } from 'vue'
import {initYmaps } from 'vue-yandex-maps'

import { estateStore } from '@/stores/estate';

const route = useRoute();
const estate = estateStore()
const city = route.params.city

onServerPrefetch(async() => {
  await estate.getGeometry(city)
  initYmaps()
})
onBeforeMount(async() => {
  await estate.getGeometry(city)
  initYmaps()
})
const TheWelcome = defineAsyncComponent(() =>
  import('../components/TheWelcome.vue')
)
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
