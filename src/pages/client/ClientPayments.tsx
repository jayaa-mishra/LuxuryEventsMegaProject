import React from 'react';
import { useClientPayments } from '@/hooks/useClientData';
import { CreditCard, ExternalLink } from 'lucide-react';

const statusColor: Record<string, string> = {
  created:  'text-amber-700 bg-amber-50 border-amber-200',
  paid:     'text-green-700 bg-green-50 border-green-200',
  failed:   'text-red-700 bg-red-50 border-red-200',
  refunded: 'text-gray-600 bg-gray-50 border-gray-200',
};

export default function ClientPayments() {
  const { payments, fetching } = useClientPayments();

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-8 border-b border-rose/10 pb-6">
        <h1 className="text-3xl font-light text-plum">Payment <span className="italic font-serif">History</span></h1>
        <p className="font-sans text-xs text-plum/50 mt-1 tracking-wide">All transactions associated with your events</p>
      </div>

      {!fetching && payments.length > 0 && (
        <div className="bg-rose/5 border border-rose/10 p-5 mb-6 flex items-center justify-between">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60">Total Paid</p>
          <p className="font-serif text-2xl text-plum">₹{totalPaid.toLocaleString('en-IN')}</p>
        </div>
      )}

      {fetching ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white border border-rose/10 animate-pulse rounded-sm" />)}
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-24 bg-white border border-rose/10">
          <CreditCard size={36} className="text-plum/20 mx-auto mb-4" />
          <p className="font-serif italic text-plum/40 text-lg">No payments yet</p>
          <p className="font-sans text-xs text-plum/30 tracking-wide mt-2">
            Your payment transactions will appear here
          </p>
        </div>
      ) : (
        <div className="bg-white border border-rose/10 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-125 text-left">
            <thead>
              <tr className="border-b border-rose/10 bg-rose/5">
                <th className="py-3 px-5 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50">Date</th>
                <th className="py-3 px-5 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50">Amount</th>
                <th className="py-3 px-5 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50">Status</th>
                <th className="py-3 px-5 font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id} className="border-b border-rose/5 last:border-0 hover:bg-rose/5 transition-colors">
                  <td className="py-4 px-5 font-sans text-sm text-plum">
                    {new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-5 font-sans text-sm text-plum font-medium">
                    {p.currency ?? '₹'} {(p.amount || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-5">
                    <span className={`font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 border rounded-sm ${statusColor[p.status] ?? 'text-plum/50 bg-white border-plum/10'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    {p.receiptUrl ? (
                      <a href={p.receiptUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-widest text-rose hover:text-plum transition-colors">
                        <ExternalLink size={11} /> View
                      </a>
                    ) : (
                      <span className="text-plum/30 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
