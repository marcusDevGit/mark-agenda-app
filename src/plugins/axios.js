import axios from 'axios';

// Configuração da URL base da API
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:7000';
axios.defaults.withCredentials = true;

// Interceptor para adicionar token de autenticação
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para tratar erros de resposta
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Erro 401 (não autorizado)
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // Redirecionar para login se necessário
      }

      return Promise.reject({
        message: error.response.data.error || 'Ocorreu um erro. Tente novamente.'
      });
    }

    return Promise.reject({
      message: 'Erro de conexão. Verifique sua internet.'
    });
  }
);

export default axios;
