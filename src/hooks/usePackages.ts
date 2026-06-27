import { useState, useEffect } from 'react';
import { Package } from '../types/models';
import { packageService } from '../services/packageService';

export function usePackages(params?: Record<string, any>) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setFetching(true);
        const data = await packageService.getPackages(params);
        setPackages(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch packages');
      } finally {
        setFetching(false);
      }
    };
    fetchPackages();
  }, [JSON.stringify(params)]);

  const create = async (pkg: Partial<Package>) => {
    try {
      const newPkg = await packageService.createPackage(pkg);
      if (newPkg) setPackages(prev => [...prev, newPkg]);
      return true;
    } catch { return false; }
  };

  const update = async (id: string, pkg: Partial<Package>) => {
    try {
      const updated = await packageService.updatePackage(id, pkg);
      if (updated) setPackages(prev => prev.map(p => p._id === id ? updated : p));
      return true;
    } catch { return false; }
  };

  const remove = async (id: string) => {
    try {
      await packageService.deletePackage(id);
      setPackages(prev => prev.filter(p => p._id !== id));
      return true;
    } catch { return false; }
  };

  return { packages, fetching, error, create, update, remove };
}
