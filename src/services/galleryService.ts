import apiClient from '../config/apiClient';
import { Gallery, ApiResponse } from '../types/models';

export const galleryService = {
  getGalleries: async (params?: Record<string, any>) => {
    const { data } = await apiClient.get<ApiResponse<Gallery[]>>('/gallery', { params });
    return data.data;
  },
  getGalleryById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Gallery>>(`/gallery/${id}`);
    return data.data;
  },
  createGallery: async (galleryData: Partial<Gallery>) => {
    const { data } = await apiClient.post<ApiResponse<Gallery>>('/gallery', galleryData);
    return data.data;
  },
  deleteGallery: async (id: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/gallery/${id}`);
    return data.success;
  },
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await apiClient.post<ApiResponse<{ url: string; public_id: string }>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.data;
  }
};
