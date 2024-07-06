<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, defineAsyncComponent, onServerPrefetch } from 'vue'
import {initYmaps } from 'vue-yandex-maps'

import { estateStore } from '@/stores/estate';

const TheWelcome = defineAsyncComponent(() =>
  import('../components/TheWelcome.vue')
)
const route = useRoute();
const estate = estateStore()
const city = route.params.city

onBeforeMount(async() => {
  await estate.getGeometry(city)
  await initYmaps()
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
