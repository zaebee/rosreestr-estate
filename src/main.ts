//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(createYmaps({
  apikey: '28a17595-ef93-4576-bd46-42eee945d1cb',
}))

app.mount('#app')
