import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

// Same-origin relative base. A proxy forwards /api to the gateway — Vite in dev
// (see vite.config.ts) and nginx in prod (see nginx.conf) — which fans out /auth
// to the auth-service and everything else to the main API. Staying same-origin
// keeps the httpOnly refresh cookie working (no cross-site SameSite issues).
// Override with VITE_API_BASE_URL=http://localhost:5000/api/v1 to hit the main API directly.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: attach the access token from localStorage.
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

const setStoredToken = (token: string) => {
  const userInfo = localStorage.getItem('userInfo');
  const parsed = userInfo ? JSON.parse(userInfo) : {};
  localStorage.setItem('userInfo', JSON.stringify({ ...parsed, token }));
};

const clearSession = () => localStorage.removeItem('userInfo');

// Single-flight refresh: concurrent 401s share one /auth/refresh call.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${apiClient.defaults.baseURL}/auth/refresh`,
        {},
        { withCredentials: true },
      )
      .then((res) => {
        const token = res.data?.data?.token;
        if (!token) throw new Error('No token in refresh response');
        setStoredToken(token);
        return token as string;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Response Interceptor: unwrap legacy responses + transparently refresh on 401.
apiClient.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      typeof response.data === 'object' &&
      response.data.success === undefined &&
      response.data.data === undefined
    ) {
      response.data = { success: true, data: response.data };
    }
    return response;
  },
  async (error: AxiosError<any>) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const status = error.response?.status;
    const url = original?.url || '';
    const isAuthEndpoint = url.includes('/auth/refresh') || url.includes('/auth/login');

    // Try one silent refresh + retry on the first 401 of a non-auth request.
    if (status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        const token = await refreshAccessToken();
        original.headers = original.headers ?? {};
        (original.headers as Record<string, string>).Authorization = `Bearer ${token}`;
        return apiClient(original);
      } catch {
        clearSession();
        return Promise.reject(error);
      }
    }

    if (status === 401) {
      clearSession();
    } else {
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
