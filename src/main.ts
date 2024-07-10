import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';
import { VCodeBlock } from '@wdns/vue-code-block';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.use(createYmaps({
  apikey: '28a17595-ef93-4576-bd46-42eee945d1cb',
}))
app.component('VCodeBlock', VCodeBlock);
app.mount('#app')
