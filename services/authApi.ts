import api from './api';

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
    try {
      const response = await api.post('/auth/login', credentials);

      const { user, message } = response.data;
      
      return {
        success: true,
        user,
        message,
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
    try {
      const response = await api.post('/auth/logout');
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