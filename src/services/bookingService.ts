import apiClient from '../config/apiClient';
import { Booking, ApiResponse } from '../types/models';

export const bookingService = {
  getBookings: async (params?: Record<string, any>) => {
    const { data } = await apiClient.get<ApiResponse<Booking[]>>('/bookings', { params });
    return data.data;
  },
  updateBookingStatus: async (id: string, status: string) => {
    const { data } = await apiClient.put<ApiResponse<Booking>>(`/bookings/${id}`, { status });
    return data.data;
  }
};
