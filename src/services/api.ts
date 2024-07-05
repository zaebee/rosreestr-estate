import axios from 'axios';

const API_URL = (
    'https://gist.githubusercontent.com/zaebee/'+
    'e2d4af41b4b60f3b5c583433ca0007e2/raw/'+
    'f797865bb5224d1dcc2e84b0818440b425106210/json')

export default {
  async getAllProperties() {
    const response = await axios.get(API_URL);
    return response.data;
  },
  async getPropertyById(id: String) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
}
