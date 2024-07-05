<template>
    <yandex-map v-model="map" height="400px" :settings="{
        location: LOCATION,
        showScaleInCopyrights: true,
    }" width="100%">
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />
        <yandex-map-controls :settings="{ position: 'right' }">
            <yandex-map-zoom-control />
        </yandex-map-controls>

        <yandex-map-feature v-for="(feature, index) in features" :key="index" :settings="feature" />
        <yandex-map-marker v-for="(marker, index) in MARKERS" :key="index"
            :settings="{ coordinates: marker.coordinates, onClick: () => openMarker = index, zIndex: openMarker === index ? 1 : 0 }">
            <div class="marker">
                {{ index }}

                <div v-if="openMarker === index" class="popup" @click.stop="openMarker = null">
                    Click me to close popup
                </div>
            </div>
        </yandex-map-marker>
    </yandex-map>
</template>

<script setup lang="ts">

import {
    YandexMap,
    YandexMapControls,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapFeature,
    YandexMapMarker,
    YandexMapZoomControl,
} from 'vue-yandex-maps';
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import type { LngLat, YMap, YMapFeatureProps } from '@yandex/ymaps3-types';
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';
import type { Geometry } from '@yandex/ymaps3-types/imperative/YMapFeature/types';
import json from '../json/data.json';
import data from '../json/krasnodar.json';


const openMarker = ref<null | number>(null);
const map = shallowRef<YMap | null>(null);
const LOCATION: YMapLocationRequest = {
    center: [38.99408410311137, 45.1801123889078], // starting position [lng, lat]
    zoom: 17, // starting zoom
};

const defaultSettings = {
    geometry: {
        type: 'MultiPolygon',
    },
    style: {
        stroke: [{
            color: '#006efc',
            width: 1,
        }],
        fill: 'rgba(56, 56, 219, 0.5)',
        fillOpacity: 0.7,
        //  element: new HTMLDivElement()
    },
} satisfies Omit<YMapFeatureProps, 'geometry'> & { geometry: Partial<YMapFeatureProps['geometry']> };

const POLYGON_COORDINATES = json;

const MARKERS: { coordinates: LngLat }[] = [
    {
        coordinates: [38.992200477991936, 45.18081770572706],
    },
    {
        coordinates: [37.588144, 55.733842],
    },
    {
        coordinates: [37.988144, 55.733842],
    },
];

const features: YMapFeatureProps[] = data.map(item => {
    let item_cn: string[] = item.properties.cn.split(':');
    let item_last_cn: number = parseInt(item_cn[item_cn.length - 1]);
    let fill = (item_last_cn % 2 == 0) ? 'rgba(56, 56, 219, 0.5)' : 'rgba(21, 56, 21, 0.5)';
    return {
        ...defaultSettings,
        style: {
            fill: fill
        },
        geometry: item.geometry as Geometry,
        properties: item.properties as Record<string, unknown>
    }
});

//const properties = getAllProperties()
const reactivityTestCounter = ref(0);
onMounted(() => {
    const interval = setInterval(() => reactivityTestCounter.value++, 1000);
    onBeforeUnmount(() => clearInterval(interval));
});
</script>

<style scoped>
.marker-popup {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    color: black;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
}

.marker {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    color: #222;
    font-weight: 600;
    padding: 2px;
    white-space: nowrap;
}

.popup {
    position: absolute;
    top: calc(100% + 10px);
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    color: black;
}
</style>