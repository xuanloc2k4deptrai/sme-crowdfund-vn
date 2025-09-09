import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add authentication token to requests
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

export const campaignAPI = {
  getAll: () => api.get('/campaigns'),
  getById: (id: string | number) => api.get(`/campaigns/${id}`),
  create: (data: { 
    title: string; 
    summary: string; 
    description?: string; 
    target: number; 
    imageUrl?: string; 
    industry?: string; 
    riskLevel?: string; 
    type?: string; 
    location?: string 
  }) => api.post('/campaigns', data),
  update: (id: string | number, data: { 
    title?: string; 
    summary?: string; 
    description?: string; 
    target?: number; 
    status?: string; 
    imageUrl?: string; 
    industry?: string; 
    riskLevel?: string; 
    type?: string; 
    location?: string 
  }) => api.put(`/campaigns/${id}`, data),
  delete: (id: string | number) => api.delete(`/campaigns/${id}`),
};

export default api;