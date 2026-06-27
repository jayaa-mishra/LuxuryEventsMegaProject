import React from 'react';

interface Props {
  status: 'draft' | 'generated' | 'sent' | 'accepted' | 'rejected' | 'expired';
}

export const QuotationStatusBadge: React.FC<Props> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'generated': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'sent': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'accepted': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'expired': return 'bg-gray-200 text-gray-500 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-2.5 py-1 text-[10px] font-sans tracking-[0.1em] uppercase border ${getBadgeStyle()}`}>
      {status}
    </span>
  );
};
