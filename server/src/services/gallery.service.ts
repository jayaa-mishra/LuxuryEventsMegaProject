import { IGallery } from '../models/Gallery';
import { galleryRepository, GalleryRepository } from '../repositories/gallery.repository';
import CrudService from './crud.service';

/**
 * Gallery business logic. Pure CRUD today — extends the base service so it
 * matches every other domain and is trivial to extend later.
 */
export class GalleryService extends CrudService<IGallery> {
  constructor(private readonly galleries: GalleryRepository = galleryRepository) {
    super(galleries, 'Gallery');
  }

  async getGalleries(): Promise<IGallery[]> {
    return this.galleries.getAllSorted();
  }

  async getGalleryById(id: string): Promise<IGallery> {
    return this.get(id);
  }

  async createGallery(data: Partial<IGallery>): Promise<IGallery> {
    return this.create(data);
  }

  async deleteGallery(id: string): Promise<IGallery> {
    return this.destroy(id);
  }
}

export const galleryService = new GalleryService();
export default galleryService;
