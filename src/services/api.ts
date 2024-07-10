import axios from 'axios';
import type { Geometry } from '@yandex/ymaps3-types/imperative/YMapFeature/types'
import type { LngLat } from '@yandex/ymaps3-types'

const API_URL = (
    'https://raw.githubusercontent.com/zaebee/rosreestr-estate/main/src/json/')

export type EstateGeometry = {
  id?: string;
  geometry: Geometry;
  source?: string;
  properties: Record<string, any>;
}
export type Marker = {
  coordinates: LngLat;
  cn: number;
  cad_cost: number;
  status: string;
}
export default {
  async getGeometryById(id: string|string[]) {
    const response = await axios.get(`${API_URL}/${id}.json`);
    return response.data as {center: [number, number], items: EstateGeometry[]};
  },

  async postLead(name: string, phone: string) {
    const data = {
      title: `Новый лид ${name} / ${phone}`,
      columnId: "24349062-ca06-4e93-b110-fe21eeac23df",
      description: "string",
      archived: false,
      completed: false,
    }
    const token = import.meta.env.VITE_YOUGILE_TOKEN
    const headers = { 'Authorization': `Bearer ${token}` }
    const response = await axios.post('https://ru.yougile.com/api-v2/tasks ', data, {headers})
    return response.data
  }
}
