import React from 'react';
import { Link } from 'react-router-dom';
import { useClientBookings } from '@/hooks/useClientData';
import { CalendarDays, MapPin, CreditCard } from 'lucide-react';

const statusColor: Record<string, string> = {
  pending:     'text-amber-700 bg-amber-50 border-amber-200',
  approved:    'text-blue-700 bg-blue-50 border-blue-200',
  in_progress: 'text-purple-700 bg-purple-50 border-purple-200',
  completed:   'text-green-700 bg-green-50 border-green-200',
  cancelled:   'text-red-700 bg-red-50 border-red-200',
};

const paymentColor: Record<string, string> = {
  pending: 'text-amber-700 bg-amber-50 border-amber-200',
  partial: 'text-blue-700 bg-blue-50 border-blue-200',
  paid:    'text-green-700 bg-green-50 border-green-200',
};

export default function ClientBookings() {
  const { bookings, fetching } = useClientBookings();

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-8 border-b border-rose/10 pb-6">
        <h1 className="text-3xl font-light text-plum">My <span className="italic font-serif">Bookings</span></h1>
        <p className="font-sans text-xs text-plum/50 mt-1 tracking-wide">All your event bookings in one place</p>
      </div>

      {fetching ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-28 bg-white border border-rose/10 animate-pulse rounded-sm" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-24 bg-white border border-rose/10">
          <CalendarDays size={36} className="text-plum/20 mx-auto mb-4" />
          <p className="font-serif italic text-plum/40 text-lg">No bookings yet</p>
          <p className="font-sans text-xs text-plum/30 tracking-wide mt-2">Your confirmed events will appear here</p>
          <Link to="/inquiry" className="inline-block mt-6 px-6 py-3 bg-rose text-blush font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-plum transition-colors">
            Submit an Inquiry
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const pkg = typeof booking.package_id === 'object' ? (booking.package_id as any) : null;
            return (
              <div key={booking._id} className="bg-white border border-rose/10 p-6 hover:border-rose/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={14} className="text-rose" />
                      <p className="font-serif text-lg text-plum">{booking.venue}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarDays size={13} className="text-plum/40" />
                      <p className="font-sans text-xs text-plum/60">
                        {new Date(booking.event_date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    {pkg && (
                      <p className="font-sans text-xs text-plum/50">Package: <span className="text-plum">{pkg.name}</span></p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-start sm:items-end">
                    <span className={`font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 border rounded-sm ${statusColor[booking.status] ?? 'text-plum/50 bg-white border-plum/10'}`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1">
                      <CreditCard size={11} className="text-plum/40" />
                      <span className={`font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 border rounded-sm ${paymentColor[booking.payment_status] ?? ''}`}>
                        {booking.payment_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
