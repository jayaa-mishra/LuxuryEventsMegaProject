import React from 'react';
import { Download } from 'lucide-react';

interface Props {
  quotationId: string;
  label?: string;
  className?: string;
}

export const QuotationDownloadButton: React.FC<Props> = ({ 
  quotationId, 
  label = 'Download PDF',
  className = ''
}) => {
  const handleDownload = () => {
    // Navigate directly to download route which returns attachment or redirects to signed cloudinary URL
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const token = localStorage.getItem('token');
    
    // Create an invisible iframe/form to handle download with auth or open in new tab
    // Since our JWT is in httpOnly cookies or Authorization header, hitting it from an <a> tag directly might not pass headers.
    // If using cookies, <a> is fine. We configured cookies previously!
    window.open(`${baseUrl}/quotations/${quotationId}/download`, '_blank');
  };

  return (
    <button 
      onClick={handleDownload}
      className={`flex items-center gap-2 px-4 py-2 bg-plum text-blush font-sans text-xs tracking-wider uppercase hover:bg-plum/90 transition-colors ${className}`}
    >
      <Download size={14} />
      <span>{label}</span>
    </button>
  );
};
