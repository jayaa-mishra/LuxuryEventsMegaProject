import { useState } from 'react';
import apiClient from '../config/apiClient';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function usePayment() {
  const [loading, setLoading] = useState(false);

  const initPayment = async (bookingId: string) => {
    try {
      setLoading(true);
      const res = await apiClient.post('/payments/order', { bookingId });
      const { amount, orderId, currency, paymentId } = res.data.data;

      const options = {
        key: process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mock',
        amount: amount * 100,
        currency: currency,
        name: 'Luxury Events',
        description: 'Event Payment',
        order_id: orderId,
        handler: async function (response: any) {
          try {
            await apiClient.post('/payments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            toast.success('Payment successful!');
            setTimeout(() => window.location.reload(), 1000);
          } catch (err: any) {
            toast.error(err.response?.data?.message || 'Payment verification failed');
          }
        },
        theme: {
          color: '#3b2f2f'
        }
      };

      if (!window.Razorpay) {
         // mock success if script not loaded (e.g. testing)
         toast.error('Razorpay SDK not loaded');
         return;
      }

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        toast.error('Payment failed');
      });
      rzp.open();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  return { initPayment, loading };
}
