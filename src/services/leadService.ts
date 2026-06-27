import apiClient from '../config/apiClient';
import { Lead, ApiResponse } from '../types/models';

export const leadService = {
  getLeads: async (params?: Record<string, any>) => {
    const { data } = await apiClient.get<ApiResponse<Lead[]>>('/leads', { params });
    return data.data;
  },
  createLead: async (leadData: Partial<Lead>) => {
    const { data } = await apiClient.post<ApiResponse<Lead>>('/leads', leadData);
    return data.data;
  },
  updateLeadStatus: async (id: string, status: string) => {
    const { data } = await apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, { status });
    return data.data;
  }
};
