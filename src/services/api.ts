import axios from 'axios';
import type { Geometry } from '@yandex/ymaps3-types/imperative/YMapFeature/types'

const API_URL = (
    'https://raw.githubusercontent.com/zaebee/rosreestr-estate/main/src/json/')

export type EstateGeometry = {
  id?: string;
  geometry: Geometry;
  source?: string;
  properties: Record<string, any>;
}
export default {
  async getGeometryById(id: string|string[]) {
    const response = await axios.get(`${API_URL}/${id}.json`);
    return response.data as {center: [number, number], items: EstateGeometry[]};
  }
}
