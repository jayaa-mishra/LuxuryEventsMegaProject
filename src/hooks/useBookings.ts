import { useState, useEffect } from 'react';
import { Booking } from '../types/models';
import { bookingService } from '../services/bookingService';

export function useBookings(params?: Record<string, any>) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setFetching(true);
        const data = await bookingService.getBookings(params);
        setBookings(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch bookings');
      } finally {
        setFetching(false);
      }
    };
    
    // Only fetch if client_id exists in params (if we are looking for a specific client)
    // Or if admin, params might be empty
    fetchBookings();
  }, [JSON.stringify(params)]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await bookingService.updateBookingStatus(id, status);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: status as any } : b));
      return true;
    } catch (err) {
      return false;
    }
  };

  return { bookings, fetching, error, updateStatus };
}
