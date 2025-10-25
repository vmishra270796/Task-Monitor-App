import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth');
  const token = raw ? JSON.parse(raw).token : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
