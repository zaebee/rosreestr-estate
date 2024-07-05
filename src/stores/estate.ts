import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import getAllProperties from '@/services/api';

/**
 * Simulate a login
 */
function apiGeo(a: string, p: string) {
    if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
    if (p === 'ed') return Promise.resolve({ isAdmin: false })
    return Promise.reject(new Error('invalid credentials'))
  }

export const estateStore = defineStore('estate', () => {
  const count = ref(0)
  //const props = getAllProperties()
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
