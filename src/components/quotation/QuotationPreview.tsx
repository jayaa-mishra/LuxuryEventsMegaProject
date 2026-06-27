import React from 'react';

interface Props {
  pdfUrl: string;
  onClose: () => void;
}

export const QuotationPreview: React.FC<Props> = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-12">
      <div className="bg-white w-full max-w-6xl h-full flex flex-col shadow-2xl relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="font-serif text-xl text-plum">Quotation Preview</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-rose transition-colors"
          >
            Close
          </button>
        </div>
        <div className="flex-1 bg-gray-50">
          <iframe 
            src={pdfUrl} 
            className="w-full h-full"
            title="Quotation PDF"
          />
        </div>
      </div>
    </div>
  );
};
