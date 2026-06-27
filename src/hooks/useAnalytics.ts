import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

export function useAnalytics() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getDashboardMetrics();
        setMetrics(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return { metrics, loading, error };
}
