import { useState, useEffect } from 'react';
import { Gallery } from '../types/models';
import { galleryService } from '../services/galleryService';

export function useGallery(params?: Record<string, any>) {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setFetching(true);
        const data = await galleryService.getGalleries(params);
        setGalleries(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch gallery');
      } finally {
        setFetching(false);
      }
    };
    fetchGalleries();
  }, [JSON.stringify(params)]);

  const create = async (data: Partial<Gallery>) => {
    try {
      const newGallery = await galleryService.createGallery(data);
      if (newGallery) setGalleries(prev => [...prev, newGallery]);
      return true;
    } catch { return false; }
  };

  const remove = async (id: string) => {
    try {
      await galleryService.deleteGallery(id);
      setGalleries(prev => prev.filter(g => g._id !== id));
      return true;
    } catch { return false; }
  };

  const upload = async (file: File) => {
    try {
      return await galleryService.uploadImage(file);
    } catch { return null; }
  };

  return { galleries, fetching, error, create, remove, upload };
}
