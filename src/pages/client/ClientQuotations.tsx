import React from 'react';
import { useClientQuotations } from '@/hooks/useClientData';
import { FileText, Download, ExternalLink } from 'lucide-react';

const statusColor: Record<string, string> = {
  draft:     'text-gray-600 bg-gray-50 border-gray-200',
  generated: 'text-blue-700 bg-blue-50 border-blue-200',
  sent:      'text-indigo-700 bg-indigo-50 border-indigo-200',
  accepted:  'text-green-700 bg-green-50 border-green-200',
  rejected:  'text-red-700 bg-red-50 border-red-200',
  expired:   'text-gray-500 bg-gray-50 border-gray-200',
};

export default function ClientQuotations() {
  const { quotations, fetching } = useClientQuotations();

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-8 border-b border-rose/10 pb-6">
        <h1 className="text-3xl font-light text-plum">My <span className="italic font-serif">Quotations</span></h1>
        <p className="font-sans text-xs text-plum/50 mt-1 tracking-wide">Proposals and pricing documents from our team</p>
      </div>

      {fetching ? (
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-32 bg-white border border-rose/10 animate-pulse rounded-sm" />)}
        </div>
      ) : quotations.length === 0 ? (
        <div className="text-center py-24 bg-white border border-rose/10">
          <FileText size={36} className="text-plum/20 mx-auto mb-4" />
          <p className="font-serif italic text-plum/40 text-lg">No quotations yet</p>
          <p className="font-sans text-xs text-plum/30 tracking-wide mt-2">
            Your personalised proposals will appear here once our team prepares them
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotations.map(q => (
            <div key={q._id} className="bg-white border border-rose/10 p-6 hover:border-rose/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileText size={16} className="text-rose" />
                    <p className="font-serif text-lg text-plum">
                      {q.quotationNumber || `QT-${q._id.slice(-6).toUpperCase()}`}
                    </p>
                    <span className={`font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 border rounded-sm ${statusColor[q.status] ?? ''}`}>
                      {q.status}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-plum/70 mb-1">
                    Total: <span className="text-plum font-medium">₹{q.total_amount?.toLocaleString('en-IN')}</span>
                  </p>
                  {q.validUntil && (
                    <p className="font-sans text-xs text-plum/40">
                      Valid until {new Date(q.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  {q.custom_additions && (
                    <p className="font-sans text-xs text-plum/50 mt-2 italic">Notes: {q.custom_additions}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  {q.pdfUrl ? (
                    <>
                      <a
                        href={q.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase text-plum/60 hover:text-plum border-b border-plum/20 pb-0.5 transition-colors"
                      >
                        <ExternalLink size={11} /> Preview
                      </a>
                      <a
                        href={q.pdfUrl}
                        download
                        className="flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase text-rose hover:text-plum border-b border-rose/30 pb-0.5 transition-colors"
                      >
                        <Download size={11} /> Download
                      </a>
                    </>
                  ) : (
                    <span className="font-sans text-[10px] tracking-widest uppercase text-plum/30">PDF pending</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
