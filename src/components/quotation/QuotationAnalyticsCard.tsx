import React from 'react';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
}

export const QuotationAnalyticsCard: React.FC<Props> = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white border border-rose/10 p-6 flex flex-col justify-between h-full">
      <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/50 mb-4">{title}</h4>
      <div>
        <p className="text-3xl font-light text-plum mb-1">{value}</p>
        {subtitle && (
          <p className="font-sans text-[9px] tracking-wider uppercase text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
