import apiClient from '../config/apiClient';
import { Quotation, ApiResponse } from '../types/models';

export const quotationService = {
  getQuotations: async (params?: Record<string, any>) => {
    const { data } = await apiClient.get<ApiResponse<Quotation[]>>('/quotations', { params });
    return data.data;
  },
  createQuotation: async (quotationData: Partial<Quotation>) => {
    const { data } = await apiClient.post<ApiResponse<Quotation>>('/quotations', quotationData);
    return data.data;
  },
  updateQuotationStatus: async (id: string, status: string) => {
    const { data } = await apiClient.patch<ApiResponse<Quotation>>(`/quotations/${id}`, { status });
    return data.data;
  },
  generatePdf: async (id: string) => {
    const { data } = await apiClient.post<ApiResponse<Quotation>>(`/quotations/${id}/generate`);
    return data.data;
  },
  regeneratePdf: async (id: string) => {
    const { data } = await apiClient.post<ApiResponse<Quotation>>(`/quotations/${id}/regenerate`);
    return data.data;
  },
  getHistory: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<any[]>>(`/quotations/${id}/history`);
    return data.data;
  }
};
