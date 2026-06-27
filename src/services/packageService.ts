import apiClient from '../config/apiClient';
import { Package, ApiResponse } from '../types/models';

export const packageService = {
  getPackages: async (params?: Record<string, any>) => {
    const { data } = await apiClient.get<ApiResponse<Package[]>>('/packages', { params });
    return data.data;
  },
  getPackageById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Package>>(`/packages/${id}`);
    return data.data;
  },
  createPackage: async (pkg: Partial<Package>) => {
    const { data } = await apiClient.post<ApiResponse<Package>>('/packages', pkg);
    return data.data;
  },
  updatePackage: async (id: string, pkg: Partial<Package>) => {
    const { data } = await apiClient.put<ApiResponse<Package>>(`/packages/${id}`, pkg);
    return data.data;
  },
  deletePackage: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/packages/${id}`);
    return data.success;
  }
};
