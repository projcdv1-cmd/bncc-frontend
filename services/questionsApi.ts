import api from './api';

export enum Disciplina {
  PORTUGUES = 'LP',
  MATEMATICA = 'MA',
  CIENCIAS = 'CI'
}

export interface QuestionsParams {
  page: number;
  disciplina: Disciplina;
  ano: number;
}

export interface QuestionsResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export const questionsService = {
  getQuestions: async (params: QuestionsParams): Promise<QuestionsResponse> => {
    console.log('[QUESTIONS] Buscando questões...', params);
    
    try {
      const response = await api.get('/questoes', {
        params: {
          page: params.page,
          disciplina: params.disciplina,
          ano: params.ano,
          shuffle: true
        }
      });
      
      console.log('[QUESTIONS] Questões carregadas com sucesso');
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.log('[QUESTIONS] Erro ao buscar questões: ', error.message);
      
      return {
        success: false,
        message: error.response?.data?.message || `Erro de conexão: ${error.message}`,
      };
    }
  }
};

export default questionsService;