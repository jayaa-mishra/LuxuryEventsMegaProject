import React from 'react';
import { Download } from 'lucide-react';

interface HistoryItem {
  version: number;
  pdfUrl: string;
  generatedAt: string;
}

interface Props {
  history: HistoryItem[];
}

export const QuotationHistory: React.FC<Props> = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white border border-rose/10 p-6">
      <h3 className="font-serif text-lg text-plum mb-4">Version History</h3>
      <div className="space-y-4">
        {history.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <div>
              <p className="font-sans text-xs font-bold text-plum">Version {item.version}</p>
              <p className="font-sans text-[10px] text-gray-400">{new Date(item.generatedAt).toLocaleString()}</p>
            </div>
            <a 
              href={item.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-rose hover:text-plum transition-colors flex items-center gap-1 font-sans text-[10px] tracking-wider uppercase"
            >
              <Download size={12} /> View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
