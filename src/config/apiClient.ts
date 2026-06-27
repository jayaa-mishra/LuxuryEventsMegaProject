import axios from 'axios';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach token if we decide to store it in localStorage instead of pure HttpOnly cookies
apiClient.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Global error handling
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object' && response.data.success === undefined && response.data.data === undefined) {
      response.data = { success: true, data: response.data };
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Don't toast 401s if checking profile on mount, it's annoying. Let specific hooks handle it if needed.
    // However, for strict requirements, we can auto logout on 401.
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo');
      // Optional: window.location.href = '/admin/login';
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
