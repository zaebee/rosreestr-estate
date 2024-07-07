<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Визуализируйте участки на Яндекс Картах и мгновенно демонстрируйте, какие участки проданы, забронированы или
      свободны.
    </h3>
    <p>Закажите разработку вашего генплана уже сегодня и через 3 дня мы установим код на ваш сайт.</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  line-height: 1.2;
}

h3 {
  font-size: 1.2rem;
  margin: 20px 0;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
