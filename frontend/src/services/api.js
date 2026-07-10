import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor → attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor → handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isSilent = error.config?.silent === true;
    const alreadyOnLogin = window.location.pathname === '/login';

    // Only force a logout+redirect for real auth failures on requests
    // that actually need it. Background/optional calls (e.g. checking
    // "my bookings" just to render a status badge) pass { silent: true }
    // and should fail quietly instead of kicking the whole app to /login.
    if (status === 401 && !isSilent && !alreadyOnLogin) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;