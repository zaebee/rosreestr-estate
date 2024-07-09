<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Bullets from './components/Bullets.vue'
import LeadForm from './components/LeadForm.vue'
import TelegramLoginBtn from './components/TelegramLoginBtn.vue'

const showForm = ref<boolean>(false)
</script>

<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="12">
        <v-row>
          <v-col cols="12" md="12">
            <HelloWorld msg="Установите интерактивный генеральный план поселка на любой сайт!" />
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
          <v-col cols="12" md="6">
            <TelegramLoginBtn />
          </v-col>
        </v-row>
        <Bullets />
      </v-col>
      <v-col md="6" sm="12">
        <RouterView />
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
