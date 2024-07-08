<script setup lang="ts">
import {ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Bullets from './components/Bullets.vue'
import LeadForm from './components/LeadForm.vue'

const showForm = ref<boolean>(false)
</script>

<template>
  <header>
    <div class="wrapper">
      <v-row>
        <v-col cols="12" md="12">
          <HelloWorld msg="Установите интерактивный генеральный план поселка на любой сайт!" />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" md="12">
          <v-btn color="secondary" variant="elevated" @click="showForm = !showForm">
            Написать нам
          </v-btn>
          <Transition :duration="550" name="nested">
          <div v-if="showForm">
            <LeadForm/>
          </div>
          </Transition>
          
        </v-col>
      </v-row>
      <Bullets />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.nested-enter-active, .nested-leave-active {
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
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
