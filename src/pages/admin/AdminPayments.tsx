import React, { useState, useEffect } from 'react';
import apiClient from '@/config/apiClient';

export default function AdminPayments() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await apiClient.get('/analytics/payments');
        setMetrics(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="p-8 text-plum/50">Loading metrics...</div>;
  }

  return (
    <div className="p-8 md:p-12 lg:p-20 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="font-garamond text-4xl lg:text-5xl text-plum mb-4">Payment Analytics</h1>
        <p className="font-sans text-sm text-plum/60 tracking-widest uppercase">Overview of financial performance</p>
      </header>

      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-plum/50 mb-2">Total Revenue</h3>
            <p className="font-garamond text-3xl text-plum">₹{metrics.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-plum/50 mb-2">Pending Revenue</h3>
            <p className="font-garamond text-3xl text-plum">₹{metrics.pendingRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-plum/50 mb-2">Refunded</h3>
            <p className="font-garamond text-3xl text-plum">₹{metrics.refundedRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-plum/50 mb-2">Average Value</h3>
            <p className="font-garamond text-3xl text-plum">₹{metrics.averagePaymentValue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-plum/50 mb-2">Successful</h3>
            <p className="font-garamond text-3xl text-plum">{metrics.successfulPayments}</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-plum/50 mb-2">Failed</h3>
            <p className="font-garamond text-3xl text-plum">{metrics.failedPayments}</p>
          </div>
        </div>
      )}

      {metrics?.dailyRevenue && metrics.dailyRevenue.length > 0 && (
        <div className="bg-white p-8 shadow-sm">
          <h2 className="font-garamond text-2xl text-plum mb-6">Recent 30-Day Revenue Trend</h2>
          <div className="h-64 flex items-end gap-2">
            {metrics.dailyRevenue.map((day: any) => (
              <div key={day._id} className="flex-1 bg-olive/20 hover:bg-olive transition-colors relative group" style={{ height: `${(day.revenue / Math.max(...metrics.dailyRevenue.map((d:any) => d.revenue))) * 100}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-plum text-cream text-[10px] px-2 py-1 rounded whitespace-nowrap">
                   {day._id}: ₹{day.revenue.toLocaleString()}
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
