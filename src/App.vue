<template>
  <div id="app"></div>
  <main>
    <BaseMap />
  </main>
</template>

<script setup lang="ts">
import BaseMap from './components/BaseMap.vue'
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
