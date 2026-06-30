import React, { useEffect, useState } from 'react';
import apiClient from '@/config/apiClient';

export function PaymentHistoryTable() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await apiClient.get('/client/payments');
        setPayments(res.data.data ?? []);
      } catch (err) {
        console.error('Failed to fetch payments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return <div className="text-sm text-plum/50">Loading payment history...</div>;
  }

  if (payments.length === 0) {
    return <div className="text-sm text-plum/50">No payments found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-plum/10">
            <th className="py-3 font-sans text-xs tracking-widest uppercase text-plum/50">Date</th>
            <th className="py-3 font-sans text-xs tracking-widest uppercase text-plum/50">Amount</th>
            <th className="py-3 font-sans text-xs tracking-widest uppercase text-plum/50">Status</th>
            <th className="py-3 font-sans text-xs tracking-widest uppercase text-plum/50">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="border-b border-plum/5 hover:bg-black/5 transition-colors">
              <td className="py-4 font-sans text-sm text-plum">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 font-sans text-sm text-plum">
                {payment.currency} {payment.amount.toLocaleString()}
              </td>
              <td className="py-4 font-sans text-sm">
                <span className={`px-2 py-1 rounded text-xs uppercase tracking-wider ${
                  payment.status === 'paid' ? 'bg-olive text-cream' :
                  payment.status === 'failed' ? 'bg-red-900 text-white' :
                  payment.status === 'refunded' ? 'bg-gray-500 text-white' :
                  'bg-yellow-600 text-white'
                }`}>
                  {payment.status}
                </span>
              </td>
              <td className="py-4 font-sans text-sm">
                {payment.receiptUrl ? (
                  <a
                    href={payment.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive hover:text-plum underline transition-colors"
                  >
                    Download
                  </a>
                ) : (
                  <span className="text-plum/30">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
