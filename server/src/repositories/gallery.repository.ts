import Gallery, { IGallery } from '../models/Gallery';
import CrudRepository from './crud.repository';

/**
 * Gallery data-access layer. Generic CRUD inherited; gallery-specific reads here.
 */
export class GalleryRepository extends CrudRepository<IGallery> {
  constructor() {
    super(Gallery);
  }

  async getAllSorted(): Promise<IGallery[]> {
    return this.getAll({ sort: { createdAt: -1 } });
  }

  async getByCategory(category: string): Promise<IGallery[]> {
    return this.getAll({ filter: { category }, sort: { createdAt: -1 } });
  }
}

export const galleryRepository = new GalleryRepository();
export default galleryRepository;
