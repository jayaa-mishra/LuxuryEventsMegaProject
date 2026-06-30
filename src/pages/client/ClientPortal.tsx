import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useClientBookings, useClientQuotations, useClientPayments } from '@/hooks/useClientData';
import { CalendarDays, FileText, CreditCard, Clock, ArrowRight, ImageIcon } from 'lucide-react';

const statusColor: Record<string, string> = {
  pending:     'text-amber-700 bg-amber-50 border-amber-200',
  approved:    'text-blue-700 bg-blue-50 border-blue-200',
  in_progress: 'text-purple-700 bg-purple-50 border-purple-200',
  completed:   'text-green-700 bg-green-50 border-green-200',
  cancelled:   'text-red-700 bg-red-50 border-red-200',
  draft:       'text-gray-600 bg-gray-50 border-gray-200',
  generated:   'text-blue-700 bg-blue-50 border-blue-200',
  sent:        'text-indigo-700 bg-indigo-50 border-indigo-200',
  accepted:    'text-green-700 bg-green-50 border-green-200',
  rejected:    'text-red-700 bg-red-50 border-red-200',
  expired:     'text-gray-500 bg-gray-50 border-gray-200',
};

export default function ClientPortal() {
  const { user } = useAuth();
  const { bookings, fetching: bFetching } = useClientBookings();
  const { quotations, fetching: qFetching } = useClientQuotations();
  const { payments, fetching: pFetching } = useClientPayments();

  const loading = bFetching || qFetching || pFetching;

  const recentBooking = bookings[0];
  const pendingQuotations = quotations.filter(q => q.status === 'sent' || q.status === 'generated');
  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10 border-b border-rose/10 pb-8">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-plum/40 mb-2">Welcome back</p>
        <h1 className="text-4xl font-light text-plum">
          {user?.name} <span className="italic font-serif text-rose">Portal</span>
        </h1>
        <p className="font-sans text-xs text-plum/50 mt-2">{user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link to="/client/bookings" className="bg-white border border-rose/10 p-6 hover:border-rose/40 hover:shadow-md transition-all group">
          <CalendarDays size={18} className="text-rose mb-3" />
          <p className="text-3xl font-light text-plum">{loading ? '—' : bookings.length}</p>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mt-1">Bookings</p>
        </Link>
        <Link to="/client/quotations" className="bg-white border border-rose/10 p-6 hover:border-rose/40 hover:shadow-md transition-all group">
          <FileText size={18} className="text-rose mb-3" />
          <p className="text-3xl font-light text-plum">{loading ? '—' : quotations.length}</p>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mt-1">Quotations</p>
        </Link>
        <Link to="/client/payments" className="bg-white border border-rose/10 p-6 hover:border-rose/40 hover:shadow-md transition-all group">
          <CreditCard size={18} className="text-rose mb-3" />
          <p className="text-3xl font-light text-plum">
            {loading ? '—' : `₹${totalPaid.toLocaleString('en-IN')}`}
          </p>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mt-1">Total Paid</p>
        </Link>
      </div>

      {/* Portfolio CTA */}
      <Link
        to="/client/portfolio"
        className="flex items-center justify-between bg-plum text-blush px-6 py-5 mb-6 hover:bg-rose transition-colors duration-300 group"
      >
        <div className="flex items-center gap-3">
          <ImageIcon size={18} className="text-blush/60 group-hover:text-blush transition-colors" />
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-blush/60 group-hover:text-blush/80">Explore</p>
            <p className="font-serif italic text-blush text-lg leading-tight">Browse our Portfolio</p>
          </div>
        </div>
        <ArrowRight size={16} className="text-blush/40 group-hover:text-blush group-hover:translate-x-1 transition-all" />
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest booking */}
        <div className="bg-white border border-rose/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60">Latest Booking</h2>
            <Link to="/client/bookings" className="font-sans text-[9px] tracking-[0.2em] uppercase text-rose flex items-center gap-1 hover:text-plum transition-colors">
              All <ArrowRight size={10} />
            </Link>
          </div>
          {loading ? (
            <div className="h-20 bg-rose/5 animate-pulse rounded-sm" />
          ) : recentBooking ? (
            <div>
              <p className="font-serif text-lg text-plum">{recentBooking.venue}</p>
              <p className="font-sans text-xs text-plum/50 mt-1">
                {new Date(recentBooking.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <div className="flex gap-2 mt-3">
                <span className={`font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 border rounded-sm ${statusColor[recentBooking.status] ?? ''}`}>
                  {recentBooking.status.replace('_', ' ')}
                </span>
                <span className={`font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 border rounded-sm ${statusColor[recentBooking.payment_status] ?? 'text-plum/50 bg-white border-plum/10'}`}>
                  Payment: {recentBooking.payment_status}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Clock size={24} className="text-plum/20 mx-auto mb-3" />
              <p className="font-serif italic text-plum/40 text-sm">No bookings yet</p>
              <Link to="/inquiry" className="inline-block mt-4 px-5 py-2 bg-rose text-blush font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-plum transition-colors">
                Submit Inquiry
              </Link>
            </div>
          )}
        </div>

        {/* Pending quotations */}
        <div className="bg-white border border-rose/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60">Awaiting Your Review</h2>
            <Link to="/client/quotations" className="font-sans text-[9px] tracking-[0.2em] uppercase text-rose flex items-center gap-1 hover:text-plum transition-colors">
              All <ArrowRight size={10} />
            </Link>
          </div>
          {loading ? (
            <div className="h-20 bg-rose/5 animate-pulse rounded-sm" />
          ) : pendingQuotations.length > 0 ? (
            <div className="space-y-3">
              {pendingQuotations.slice(0, 3).map(q => (
                <div key={q._id} className="flex items-center justify-between py-2 border-b border-rose/5 last:border-0">
                  <div>
                    <p className="font-sans text-sm text-plum">{q.quotationNumber || `QT-${q._id.slice(-6).toUpperCase()}`}</p>
                    <p className="font-sans text-xs text-plum/40 mt-0.5">₹{q.total_amount?.toLocaleString('en-IN')}</p>
                  </div>
                  <span className={`font-sans text-[9px] tracking-widest uppercase px-2 py-1 border rounded-sm ${statusColor[q.status] ?? ''}`}>
                    {q.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <FileText size={24} className="text-plum/20 mx-auto mb-3" />
              <p className="font-serif italic text-plum/40 text-sm">No pending quotations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
