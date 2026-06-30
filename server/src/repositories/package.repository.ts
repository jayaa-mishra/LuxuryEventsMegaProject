import Package, { IPackage } from '../models/Package';
import CrudRepository from './crud.repository';

/**
 * Package data-access layer. Extends the generic CrudRepository and adds only
 * the queries that are specific to packages.
 */
export class PackageRepository extends CrudRepository<IPackage> {
  constructor() {
    super(Package);
  }

  async getActivePackages(): Promise<IPackage[]> {
    return this.getAll({ filter: { is_active: true }, sort: { createdAt: -1 } });
  }

  async getByCategory(category: string): Promise<IPackage[]> {
    return this.getAll({ filter: { category, is_active: true } });
  }
}

export const packageRepository = new PackageRepository();
export default packageRepository;
