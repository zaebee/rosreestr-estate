<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, defineAsyncComponent, onServerPrefetch, compile } from 'vue'
import {initYmaps } from 'vue-yandex-maps'

import { estateStore } from '@/stores/estate';
import TheWelcome from '../components/TheWelcome.vue'

const route = useRoute();
const estate = estateStore()
const city =  route.params.city || route.meta.city as string


onServerPrefetch(() => {
  estate.getGeometry(city)//.then(initYmaps)
//  initYmaps()
})
onBeforeMount(() => {
  estate.getGeometry(city)//.then(initYmaps)
  //initYmaps()
})

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
