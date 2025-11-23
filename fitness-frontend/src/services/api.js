import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const workoutService = {
  getAll: () => api.get('/workouts'),
  getById: (id) => api.get(`/workouts/${id}`),
  getByDate: (date) => api.get(`/workouts/date/${date}`),
  create: (data) => api.post('/workouts', data),
  update: (id, data) => api.put(`/workouts/${id}`, data),
  delete: (id) => api.delete(`/workouts/${id}`),
};

export const activityService = {
  getAll: () => api.get('/activities'),
  getToday: () => api.get('/activities/today'),
  create: (data) => api.post('/activities', data),
  getSummary: (period) => api.get(`/activities/summary?period=${period}`),
};

export const goalService = {
  getAll: () => api.get('/goals'),
  getActive: () => api.get('/goals/active'),
  create: (data) => api.post('/goals', data),
  update: (id, data) => api.put(`/goals/${id}`, data),
  updateProgress: (id, progress) => api.patch(`/goals/${id}/progress`, { progress }),
  delete: (id) => api.delete(`/goals/${id}`),
};

export default api;
