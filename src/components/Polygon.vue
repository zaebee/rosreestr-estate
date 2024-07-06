<template>
  {{ estate.cityCenter }}
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
      onClick: () => (openMarker = index),
      zIndex: openMarker === index ? 1 : 0
    }">
      <div :class="openMarker === index ? 'marker clicked' : 'marker'">{{ marker.cn }}
        <div v-if="openMarker === index" class="popup" @click.stop="openMarker = null">
          <h3>{{ city }}: {{ marker.cn }}</h3>
          <p>Статус: {{ marker.status }}</p>
          <p>Цена: {{ marker.cad_cost }} руб</p>
          <img src="https://placehold.co/100x100/png"><br>
          <button>Детали</button>
        </div>
      </div>
    </yandex-map-marker>
  </yandex-map>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref, shallowRef, onServerPrefetch, watch } from 'vue'

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
import type { LngLat, YMap, YMapFeatureProps, YMapMarker } from '@yandex/ymaps3-types'
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap'
import type { Geometry } from '@yandex/ymaps3-types/imperative/YMapFeature/types'
import { estateStore } from '@/stores/estate';
import type { EstateGeometry } from '@/services/api'

const route = useRoute();
const estate = estateStore()
const city = route.params.city

const data = ref<EstateGeometry[]>(estate.cityGeometry)
const center = ref<[number, number]>(estate.cityCenter)
const map = shallowRef<YMap | null>(null)
const openMarker = ref<null | number>(null)

const location: YMapLocationRequest = {
  center: estate.cityCenter as LngLat, // starting position [lng, lat]
  zoom: 17 // starting zoom
}

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


const features: YMapFeatureProps[] = data.value.map((item) => {
  let item_cn: string[] = item.properties.cn.split(':')
  let item_last_cn: number = parseInt(item_cn[item_cn.length - 1])
  let fill = 'rgba(21, 56, 21, 0.75)'

  if (item_last_cn >= 2257 && item_last_cn <= 2297) {
    fill = 'rgba(191, 62, 62, 0.75)'
  }
  // item_last_cn >= 2257 && item_last_cn <= 2297 ? 'rgba(191, 62, 62, 0.75)' : 'rgba(21, 56, 21, 0.75)'
  return {
    ...defaultSettings,
    style: {
      fill: fill
    },
    geometry: item.geometry as Geometry,
    properties: item.properties as Record<string, unknown>
  }
})

const markers: { coordinates: LngLat, cn: number, cad_cost: number, status: string }[] = estate.cityGeometry.map((item) => {
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
  }
})


watch(VueYandexMaps.loadStatus, (val) => {
  console.log(val); //pending | loading | loaded | error
  console.log(VueYandexMaps.loadError); //null | Error | script onerror (Event | string)
});


</script>

<style scoped>
.marker-popup {
  background: rgba(191, 62, 62, 0.759);
  border-radius: 10px;
  padding: 10px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

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
  position: absolute;
  top: calc(10% + 10px);
  background: #fff;
  padding: 10px;
  color: black;
  min-width: 200px;
  text-align: center;
  left: calc(30% + 10px);
  border: 1px solid #bababa;
  box-shadow: 1px 1px 4px #bababa;
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
