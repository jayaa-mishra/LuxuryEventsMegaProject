import { useState, useEffect } from 'react';
import apiClient from '@/config/apiClient';
import { Booking, Quotation } from '@/types/models';

export function useClientBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    apiClient.get('/client/bookings')
      .then((r) => setBookings(r.data.data ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  return { bookings, fetching };
}

export function useClientQuotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    apiClient.get('/client/quotations')
      .then((r) => setQuotations(r.data.data ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  return { quotations, fetching };
}

export function useClientPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    apiClient.get('/client/payments')
      .then((r) => setPayments(r.data.data ?? []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  return { payments, fetching };
}
