import apiClient from '../config/apiClient';
import { User, ApiResponse } from '../types/models';

export const authService = {
  register: async (data: Record<string, string>) => {
    const { data: res } = await apiClient.post<ApiResponse<User>>('/auth/register', data);
    return res.data;
  },
  login: async (credentials: Record<string, string>) => {
    const { data } = await apiClient.post<ApiResponse<User>>('/auth/login', credentials);
    return data.data;
  },
  logout: async () => {
    const { data } = await apiClient.post<ApiResponse<null>>('/auth/logout');
    return data;
  },
  getProfile: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return data.data;
  }
};
