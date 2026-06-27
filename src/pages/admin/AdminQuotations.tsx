import React, { useState } from 'react';
import { useQuotations } from '@/hooks/useQuotations';
import { useLeads } from '@/hooks/useLeads';
import { usePackages } from '@/hooks/usePackages';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { QuotationPreview } from '@/components/quotation/QuotationPreview';
import { QuotationHistory } from '@/components/quotation/QuotationHistory';
import { QuotationStatusBadge } from '@/components/quotation/QuotationStatusBadge';
import { QuotationAnalyticsCard } from '@/components/quotation/QuotationAnalyticsCard';
import { useAnalytics } from '@/hooks/useAnalytics';
import toast from 'react-hot-toast';

export default function AdminQuotations() {
  const { quotations, fetching, createQuote, updateStatus, generatePdf, regeneratePdf } = useQuotations();
  const { leads, fetching: fetchingLeads } = useLeads();
  const { packages, fetching: fetchingPackages } = usePackages();
  const { metrics } = useAnalytics();
  
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [historyQuote, setHistoryQuote] = useState<any | null>(null);

  const handleGenerate = async () => {
    if (!formData.lead_id || !formData.total_amount) {
      toast.error('Lead and total amount are required');
      return;
    }
    await createQuote({
      ...formData,
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // Valid for 30 days
    });
    setIsCreating(false);
    setFormData({});
  };

  if (fetching || fetchingLeads || fetchingPackages) return <Loader />;

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-garamond text-plum">Quotations</h1>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 mt-2">Generate and manage client quotes</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-plum text-cream px-6 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose transition-colors"
        >
          Generate Quote
        </button>
      </div>

      {metrics?.quotationMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <QuotationAnalyticsCard title="Total Quotes" value={metrics.quotationMetrics.totalQuotations} subtitle="All time" />
          <QuotationAnalyticsCard title="Acceptance Rate" value={`${metrics.quotationMetrics.acceptanceRate.toFixed(1)}%`} subtitle="Accepted / Total" />
          <QuotationAnalyticsCard title="Total Revenue" value={`$${metrics.quotationMetrics.revenueFromQuotations.toLocaleString()}`} subtitle="From accepted quotes" />
          <QuotationAnalyticsCard title="Top Package" value={metrics.quotationMetrics.mostSelectedPackage} subtitle="Most popular choice" />
        </div>
      )}

      {isCreating && (
        <div className="bg-white p-6 mb-8 border border-rose/20">
          <h2 className="font-garamond text-2xl text-plum mb-6">New Quotation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" onChange={(e) => setFormData({...formData, lead_id: e.target.value})}>
              <option value="">Select Lead...</option>
              {leads.filter(l => l.status !== 'rejected').map(l => (
                <option key={l._id} value={l._id}>{l.client_name} - {l.email}</option>
              ))}
            </select>
            <select className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" onChange={(e) => {
              const pkg = packages.find(p => p._id === e.target.value);
              setFormData({...formData, package_id: e.target.value, total_amount: pkg ? pkg.base_price : formData.total_amount});
            }}>
              <option value="">Select Package...</option>
              {packages.map(p => (
                <option key={p._id} value={p._id}>{p.name} (${p.base_price})</option>
              ))}
            </select>
            <input type="number" placeholder="Total Amount ($)" className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" value={formData.total_amount || ''} onChange={(e) => setFormData({...formData, total_amount: Number(e.target.value)})} />
          </div>
          <div className="mb-6">
            <textarea placeholder="Custom Additions / Notes" className="w-full border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum h-24" value={formData.custom_additions || ''} onChange={(e) => setFormData({...formData, custom_additions: e.target.value})} />
          </div>
          <div className="flex space-x-4">
            <button onClick={handleGenerate} className="bg-plum text-cream px-6 py-2 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose transition-colors">Generate PDF & Send</button>
            <button onClick={() => setIsCreating(false)} className="border border-plum text-plum px-6 py-2 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose/10 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {quotations.length === 0 && !isCreating ? (
        <EmptyState message="No quotations generated yet." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="border-b border-rose/20">
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Quote ID</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Client/Lead</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Amount</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Status</th>
                <th className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map(q => (
                <tr key={q._id} className="border-b border-rose/10 hover:bg-white/50 transition-colors">
                  <td className="py-4 px-4 font-sans text-xs text-plum font-medium">QT-{q._id.substring(0, 6).toUpperCase()}</td>
                  <td className="py-4 px-4">
                    <p className="font-sans font-medium text-plum">{typeof q.lead_id === 'object' ? (q.lead_id as any).client_name : 'Unknown'}</p>
                    <p className="font-sans text-[10px] tracking-wider text-plum/60 mt-1">{typeof q.package_id === 'object' ? (q.package_id as any).name : ''}</p>
                  </td>
                  <td className="py-4 px-4 font-sans text-sm text-plum">${q.total_amount?.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <QuotationStatusBadge status={q.status as any} />
                    <select
                      className="ml-2 font-sans text-[10px] tracking-[0.1em] uppercase px-2 py-1 border border-rose/30 bg-transparent focus:outline-none focus:border-plum text-plum"
                      value={q.status}
                      onChange={(e) => updateStatus(q._id, e.target.value)}
                    >
                      <option value="draft">Draft</option>
                      <option value="generated">Generated</option>
                      <option value="sent">Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="expired">Expired</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 flex gap-2">
                    {q.pdfUrl ? (
                      <>
                        <button onClick={() => setPreviewUrl(q.pdfUrl!)} className="px-3 py-1 border border-plum text-plum text-[10px] uppercase hover:bg-plum hover:text-white transition-colors">Preview</button>
                        <button onClick={() => regeneratePdf(q._id)} className="px-3 py-1 border border-plum text-plum text-[10px] uppercase hover:bg-plum hover:text-white transition-colors">Regenerate</button>
                        {q.history && q.history.length > 0 && (
                          <button onClick={() => setHistoryQuote(q)} className="px-3 py-1 border border-gray-300 text-gray-500 text-[10px] uppercase hover:bg-gray-100 transition-colors">History ({q.history.length})</button>
                        )}
                      </>
                    ) : (
                      <button onClick={() => generatePdf(q._id)} className="px-3 py-1 bg-plum text-cream text-[10px] uppercase hover:bg-rose transition-colors">Generate PDF</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {previewUrl && <QuotationPreview pdfUrl={previewUrl} onClose={() => setPreviewUrl(null)} />}
      
      {historyQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-12">
          <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto relative p-6">
            <button onClick={() => setHistoryQuote(null)} className="absolute top-4 right-4 text-gray-400 hover:text-plum">Close</button>
            <QuotationHistory history={historyQuote.history} />
          </div>
        </div>
      )}
    </div>
  );
}
