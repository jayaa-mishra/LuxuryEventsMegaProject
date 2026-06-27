import apiClient from '../config/apiClient';
import { ApiResponse } from '../types/models';

export const analyticsService = {
  getDashboardMetrics: async () => {
    const { data } = await apiClient.get<ApiResponse<any>>('/analytics/dashboard');
    return data.data;
  }
};
