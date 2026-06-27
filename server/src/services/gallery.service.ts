import Gallery, { IGallery } from '../models/Gallery';

export const getGalleries = async (): Promise<IGallery[]> => {
  return await Gallery.find({}).sort({ createdAt: -1 });
};

export const getGalleryById = async (id: string): Promise<IGallery | null> => {
  return await Gallery.findById(id);
};

export const createGallery = async (data: Partial<IGallery>): Promise<IGallery> => {
  return await Gallery.create(data);
};

export const deleteGallery = async (id: string): Promise<void> => {
  await Gallery.findByIdAndDelete(id);
};
