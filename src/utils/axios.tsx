//src/utils/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  console.log('Axios request:', {
    url: config.url,
    baseURL: config.baseURL,
    params: config.params,
    headers: config.headers,
  });
  return config;
});

export default api;
