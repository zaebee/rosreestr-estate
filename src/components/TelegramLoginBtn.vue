<script lang="ts" setup>
import { LoginWidget } from 'vue-tg'
import type { LoginWidgetUser } from 'vue-tg'

function handleUserAuth(user: LoginWidgetUser) {
  console.log(user)
}
</script>

<template>
  <LoginWidget 
    bot-username="genplan_estate_bot"
    @auth="handleUserAuth"
  />
</template>