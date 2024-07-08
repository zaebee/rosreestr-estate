import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/services/api';
import type { EstateGeometry, Marker } from '@/services/api';

/**
 * Simulate a login
 */
function apiGeo(a: string, p: string) {
    if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
    if (p === 'ed') return Promise.resolve({ isAdmin: false })
    return Promise.reject(new Error('invalid credentials'))
}

export const estateStore = defineStore({
  id: 'estate', 
  state: () => ({
    cityGeometry: [] as EstateGeometry[],
    cityCenter: [0, 0] as [number, number],
    activeMarker: null as Marker | null,
    leadSaved: false as boolean
  }),
  getters: {
    center: (state): Array<number> => state.cityCenter
  },
  actions: {
    openMarker(marker: Marker) {
      this.activeMarker = marker
    },
    async getGeometry(city: string|string[]) {
      //const count = ref(0)
      const geometry = await api.getGeometryById(city)
      this.cityGeometry = geometry.items as EstateGeometry[]
      this.cityCenter = geometry.center as [number, number]
      return this.cityGeometry
    },
    async postLead(name: string, phone: string) {
      const data = await api.postLead(name, phone)
      this.leadSaved = true
      return data
    }
  },
})
