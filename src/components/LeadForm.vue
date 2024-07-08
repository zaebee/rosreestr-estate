<template>
    <v-sheet v-if="!estate.leadSaved" class="bg-grey-darken-4 mt-6" width="300" rounded>
        <v-form fast-fail @submit.prevent>
            <v-text-field v-model="name" label="Имя"></v-text-field>
            <v-text-field v-model="phone" label="Телефон"></v-text-field>
            <v-btn class="mt-2" type="submit" color="secondary" variant="elevated" block @click="send">Отправить</v-btn>
        </v-form>
    </v-sheet>
    <v-snackbar v-model="leadSaved">
        Спасибо! Мы сохранили данные и свяжемся с вами.

        <template v-slot:actions>
            <v-btn :timeout="2000" color="success" variant="outlined" @click="leadSaved = false">
                закрыть
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { estateStore } from '@/stores/estate';

const estate = estateStore()
const name = ref<string>('')
const phone = ref<string>('+7')
const leadSaved = ref<boolean>(false)

function send() {
    console.log('send')
    estate.postLead(name.value, phone.value).then(() => {
        console.log('lead saved')
        leadSaved.value = true
    })
}
</script>