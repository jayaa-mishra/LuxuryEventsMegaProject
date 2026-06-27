import { useState, useEffect } from 'react';
import { Quotation } from '../types/models';
import { quotationService } from '../services/quotationService';
import toast from 'react-hot-toast';

export function useQuotations(params?: Record<string, any>) {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        setFetching(true);
        const data = await quotationService.getQuotations(params);
        setQuotations(data || []);
      } catch (err) {
        // error handled by interceptor
      } finally {
        setFetching(false);
      }
    };
    fetchQuotations();
  }, [JSON.stringify(params)]);

  const createQuote = async (data: Partial<Quotation>) => {
    try {
      const newQuote = await quotationService.createQuotation(data);
      if (newQuote) setQuotations(prev => [...prev, newQuote]);
      toast.success('Quotation generated successfully');
      return true;
    } catch {
      return false;
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await quotationService.updateQuotationStatus(id, status);
      setQuotations(prev => prev.map(q => q._id === id ? { ...q, status: status as any } : q));
      toast.success('Quotation status updated');
      return true;
    } catch {
      return false;
    }
  };

  const generatePdf = async (id: string) => {
    try {
      const updatedQuote = await quotationService.generatePdf(id);
      if (updatedQuote) {
        setQuotations(prev => prev.map(q => q._id === id ? updatedQuote : q));
        toast.success('PDF generated successfully');
        return updatedQuote;
      }
    } catch {
      return null;
    }
  };

  const regeneratePdf = async (id: string) => {
    try {
      const updatedQuote = await quotationService.regeneratePdf(id);
      if (updatedQuote) {
        setQuotations(prev => prev.map(q => q._id === id ? updatedQuote : q));
        toast.success('PDF regenerated successfully');
        return updatedQuote;
      }
    } catch {
      return null;
    }
  };

  const getHistory = async (id: string) => {
    try {
      return await quotationService.getHistory(id);
    } catch {
      return [];
    }
  };

  return { quotations, fetching, createQuote, updateStatus, generatePdf, regeneratePdf, getHistory };
}
