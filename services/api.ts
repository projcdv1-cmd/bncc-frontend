import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../constants/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000,
});

const forceLogout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("access_token");
  } catch (error) {
    console.error("Erro ao fazer logout automático:", error);
  }
};

// Interceptor para adicionar token JWT às requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      await forceLogout();
    }
    return Promise.reject(error);
  }
);

export default api;