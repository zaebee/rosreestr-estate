<template>
  <yandex-map v-model="map" height="400px" :settings="{
    location: location,
    showScaleInCopyrights: true
  }" width="100%">
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>

    <yandex-map-feature v-for="(feature, index) in features" :key="index" :settings="feature" />
    <yandex-map-marker v-for="(marker, index) in markers" :key="index" :settings="{
      coordinates: marker.coordinates,
      onClick: () => (activateMarker(marker)),
      zIndex: activeMarker === marker ? 1 : 0
    }">
      <div class="marker">{{ marker.cn }}</div>
    </yandex-map-marker>

  </yandex-map>
  <v-overlay v-model="overlay" class="align-center justify-center" contained>
    <v-card class="mx-auto popup">
      <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>

      <v-card-title class="py-0 px-3">Участок {{activeMarker?.cn}}</v-card-title>
      <v-card-text class="px-3">
        <div>{{ activeMarker?.status }}</div>

        <div>Цена: {{ activeMarker?.cad_cost }} руб</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="px-3">
        <v-btn color="secondary" variant="elevated" text="Детали"></v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { defineAsyncComponent, onBeforeUnmount, onBeforeMount, ref, shallowRef, onServerPrefetch, watch } from 'vue'

import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapFeature,
  YandexMapMarker,
  YandexMapZoomControl,
  VueYandexMaps
} from 'vue-yandex-maps'
import type { LngLat, YMap, YMapFeatureProps } from '@yandex/ymaps3-types'
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap'

import type { EstateGeometry, Marker } from '@/services/api'
import api from '@/services/api';


const props = defineProps({
  center: {
    type: Array<Number>,
    required: true
  },
  features: {
    type: Array<EstateGeometry>,
    required: true
  },
})

const overlay = ref<boolean>(false)

const location = ref<YMapLocationRequest>({
  center: props.center as LngLat,
  zoom: 17
})
const map = shallowRef<YMap | null>(null)
const activeMarker = ref<null | Marker>(null)

const defaultSettings = {
  geometry: {
    type: 'MultiPolygon'
  },
  style: {
    stroke: [
      {
        color: '#006efc',
        width: 1
      }
    ],
    fill: 'rgba(56, 56, 219, 0.5)',
    fillOpacity: 0.7
  }
} satisfies Omit<YMapFeatureProps, 'geometry'> & { geometry: Partial<YMapFeatureProps['geometry']> }


const features: YMapFeatureProps[] = props.features.map((item) => {
  let item_cn: string[] = item.properties.cn.split(':')
  let item_last_cn: number = parseInt(item_cn[item_cn.length - 1])
  let fill = 'rgba(0, 189, 126, 0.75)'

  if (item_last_cn >= 2257 && item_last_cn <= 2297) {
    fill = 'rgba(191, 62, 62, 0.75)'
  }
  // item_last_cn >= 2257 && item_last_cn <= 2297 ? 'rgba(191, 62, 62, 0.75)' : 'rgba(21, 56, 21, 0.75)'
  return {
    ...defaultSettings,
    style: {
      fill: fill
    },
    geometry: item.geometry,
    properties: item.properties as Record<string, unknown>
  }
})

const markers: Marker[] = props.features.map((item) => {
  let center = item.properties.center
  let item_cn: string[] = item.properties.cn.split(':')
  let item_last_cn: number = parseInt(item_cn[item_cn.length - 1].trim(), 10)
  let status = 'Продается'
  if (item_last_cn >= 2257 && item_last_cn <= 2297) {
    status = 'В резерве'
  }
  return {
    coordinates: [center.x, center.y],
    cn: item_last_cn,
    cad_cost: item.properties.cad_cost,
    status: status
  } as Marker
})

function activateMarker(marker: Marker) {
  console.log(marker)
  activeMarker.value = marker
  overlay.value = true
}

</script>

<style scoped>
.marker {
  display: block;
  cursor: pointer;
  color: #222;
  font-weight: 600;
  padding: 2px;
  white-space: nowrap;
  transform: rotate(-90deg);
  font-size: 10px;
  margin-left: -15px;
  margin-top: -10px;
}

.marker.clicked {
  transform: none;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

.popup {
  min-width: 200px;
  border: 1px solid #bababa;

}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
