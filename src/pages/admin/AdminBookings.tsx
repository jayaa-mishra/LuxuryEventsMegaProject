import React, { useState } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';

export default function AdminBookings() {
  const { bookings, fetching, updateStatus } = useBookings();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    // We assume client_id is populated in the real app, but if it's just an ID we can't search by name yet unless populated.
    // Assuming populated client_id has a 'name' field for the sake of frontend logic if returned by API.
    const clientName = typeof booking.client_id === 'object' ? (booking.client_id as any).name : 'Client';
    const matchesSearch = clientName.toLowerCase().includes(search.toLowerCase()) || 
                          booking.venue.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (fetching) return <Loader />;

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-garamond text-plum">Booking Management</h1>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 mt-2">Manage event bookings and statuses</p>
        </div>
      </div>

      <div className="bg-white p-6 mb-8 flex flex-col md:flex-row gap-4 border border-rose/20">
        <input 
          type="text" 
          placeholder="Search by client or venue..." 
          className="flex-1 bg-blush border border-rose/30 px-4 py-3 font-sans text-sm focus:outline-none focus:border-rose text-plum"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="bg-blush border border-rose/30 px-4 py-3 font-sans text-xs tracking-[0.1em] uppercase focus:outline-none focus:border-rose text-plum"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <EmptyState 
          message="No bookings found." 
          subMessage="Adjust your criteria or wait for new bookings." 
          imageSrc="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1500&auto=format&fit=crop"
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-rose/20">
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Event Date</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Client</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Details</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking._id} className="border-b border-rose/10 hover:bg-white/50 transition-colors">
                  <td className="py-4 px-4 font-sans text-sm text-plum font-medium">
                    {new Date(booking.event_date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-sans font-medium text-plum">{typeof booking.client_id === 'object' ? (booking.client_id as any).name : 'Client'}</p>
                    <p className="font-sans text-xs text-plum/60">{typeof booking.client_id === 'object' ? (booking.client_id as any).email : ''}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-sans text-sm text-plum">{booking.venue}</p>
                    <p className="font-sans text-xs text-plum/60 mt-1">Payment: {booking.payment_status}</p>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      className={`font-sans text-[10px] tracking-[0.1em] uppercase px-3 py-2 border border-rose/30 bg-transparent focus:outline-none focus:border-plum ${
                        booking.status === 'pending' ? 'text-rose font-bold' : 
                        booking.status === 'completed' ? 'text-olive font-bold' : 'text-plum'
                      }`}
                      value={booking.status}
                      onChange={(e) => updateStatus(booking._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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
