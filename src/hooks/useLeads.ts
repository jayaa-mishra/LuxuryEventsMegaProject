import { useState, useEffect } from 'react';
import { Lead } from '../types/models';
import { leadService } from '../services/leadService';
import toast from 'react-hot-toast';

export function useLeads(params?: Record<string, any>, options: { skipFetch?: boolean } = {}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setFetching(true);
        const data = await leadService.getLeads(params);
        setLeads(data || []);
      } catch (err: any) {
        // Interceptor handles error
      } finally {
        setFetching(false);
      }
    };
    if (!options.skipFetch) {
      fetchLeads();
    } else {
      setFetching(false);
    }
  }, [JSON.stringify(params), options.skipFetch]);

  const submitLead = async (leadData: Partial<Lead>) => {
    setLoading(true);
    try {
      await leadService.createLead(leadData);
      toast.success('Inquiry submitted successfully!');
      return true;
    } catch (err: any) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await leadService.updateLeadStatus(id, status);
      setLeads(prev => prev.map(l => l._id === id ? { ...l, status: status as any } : l));
      toast.success('Lead status updated');
      return true;
    } catch (err) {
      return false;
    }
  };

  return { leads, fetching, submitLead, updateStatus, loading };
}
