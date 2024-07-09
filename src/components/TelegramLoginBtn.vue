<template>
    <!-- Callback mode -->
    <span v-if="!isLoaded">Loading...</span>
    <telegram-login-temp mode="callback" telegram-login="genplan_estate_bot" @loaded='telegramLoadedCallbackFunc'
        @callback="yourCallbackFunction" />

    <!-- Redirect mode -->
    <telegram-login-temp mode="redirect" telegram-login="genplan_estate_bot" @loaded='telegramLoadedCallbackFunc'
        redirect-url="http://genplan_dev.zae.life" />
</template>

<script setup lang="js">
import { telegramLoginTemp } from 'vue3-telegram-login'
import { ref } from 'vue'

const isLoaded = ref(false)

function telegramLoadedCallbackFunc() {
    console.log('script is loaded')
    isLoaded.value = true
}

function yourCallbackFunction(user) {
    // gets user as an input
    // id, first_name, last_name, username,
    // photo_url, auth_date and hash
    console.log(user)
}
</script>