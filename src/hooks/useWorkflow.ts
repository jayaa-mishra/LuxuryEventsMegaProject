import { useState, useEffect } from 'react';
import apiClient from '../config/apiClient';

export function useWorkflow(entityId: string) {
  const [workflow, setWorkflow] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkflow = async () => {
    try {
      const res = await apiClient.get(`/workflows/entity/${entityId}`);
      setWorkflow(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (entityId) fetchWorkflow();
  }, [entityId]);

  return { workflow, loading, fetchWorkflow };
}
