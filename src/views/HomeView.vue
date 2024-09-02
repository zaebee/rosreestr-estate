<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { estateStore } from '@/stores/estate'

import Hello from '../components/Hello.vue'
import Map from '../components/Map.vue'
import Bullets from '../components/Bullets.vue'
import LeadForm from '../components/LeadForm.vue'
import TheWelcome from '../components/TheWelcome.vue'

const showForm = ref<boolean>(false)
const route = useRoute();
const estate = estateStore()
const city = route.params.city || route.meta.city as string
const Polygon = defineAsyncComponent(() => 
  import('@/components/Polygon.vue')
)
await estate.getGeometry(city)
</script>

<template>
  <v-row>
    <v-col md="6" sm="12">
      <v-row>
        <v-col cols="12" md="12">
          <Hello msg="Установите интерактивный генеральный план поселка на любой сайт!" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-btn color="secondary" variant="elevated" @click="showForm = !showForm">
            Написать нам
          </v-btn>
          <Transition :duration="550" name="nested">
            <div v-if="showForm">
              <LeadForm />
            </div>
          </Transition>
        </v-col>
      </v-row>
      <Bullets />
    </v-col>
    <v-col md="6" sm="12">
      <TheWelcome />

    </v-col>
  </v-row>

  <v-row>
    <v-col md="12" sm="12">
      <v-row>
        <v-col cols="12" md="12">
          <Map msg="Карта с генеральным планом участков большого размера" />
          <div class="map-large">
              <Polygon :center="estate.cityCenter" :features="estate.cityGeometry"/>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style>
.map-large {
  position: relative;
  top: 0;
  left: 0;
}
.actions {
  overflow: auto;
  margin: 0 1rem;
  height: 50%;
}

</style>