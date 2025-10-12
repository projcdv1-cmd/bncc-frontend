import axios from 'axios';

const API_URL = process.env.API_URL || 'http://192.168.0.10:8000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface LoginResponse {
  success: boolean;
  user?: any;
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    console.log('[AUTH] Iniciando login...');
    console.log('[AUTH] API_URL sendo usado:', API_URL);
    
    try {
      const response = await api.post('/auth/login', credentials);
      
      console.log('[AUTH] Login bem-sucedido');
      
      return {
        success: true,
        user: response.data,
      };
    } catch (error: any) {
      console.log('[AUTH] Login falhou: ', error.message);
      console.log('[AUTH] Código do erro:', error.code);
      
      return {
        success: false,
        message: error.response?.data?.message || `Erro de conexão: ${error.message}`,
      };
    }
  },
  logout: async (): Promise<LogoutResponse> => {
    console.log('[AUTH] Iniciando logout...');
    try {
      const response = await api.post('/auth/logout');
      console.log('[AUTH] Logout bem-sucedido');
      const { message } = response.data;
      return { success: true, message };
    } catch (error: any) {
      console.log('[AUTH] Logout falhou: ', error.message);
      console.log('[AUTH] Código do erro:', error.code);
      return {
        success: false,
        message: error.response?.data?.message || `Erro de conexão: ${error.message}`,
      };
    }
  },
};

export default api;