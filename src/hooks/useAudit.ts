import { useState, useEffect } from 'react';
import apiClient from '../config/apiClient';
import toast from 'react-hot-toast';

export function useAudit() {
  const [logs, setLogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [fetching, setFetching] = useState(true);

  const fetchLogs = async (page = 1, limit = 50, entityType?: string) => {
    try {
      setFetching(true);
      let url = `/audit?page=${page}&limit=${limit}`;
      if (entityType) url += `&entityType=${entityType}`;
      const res = await apiClient.get(url);
      setLogs(res.data.logs);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to fetch audit logs');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, total, pages, fetching, fetchLogs };
}
