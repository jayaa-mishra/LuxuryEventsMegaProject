import { IPackage } from '../models/Package';
import { packageRepository, PackageRepository } from '../repositories/package.repository';
import CrudService from './crud.service';
import { getCache, setCache, invalidateCache } from '../config/redis';

const ACTIVE_PACKAGES_CACHE_KEY = 'packages:active';
const PACKAGE_CACHE_PREFIX = 'packages:';

/**
 * Package business logic. Extends the generic CrudService and layers Redis
 * caching on top of the repository — the read-heavy "catalogue" endpoint is
 * the natural showcase for caching + invalidation.
 */
export class PackageService extends CrudService<IPackage> {
  constructor(private readonly packages: PackageRepository = packageRepository) {
    super(packages, 'Package');
  }

  async getActivePackages(): Promise<IPackage[]> {
    const cached = await getCache<IPackage[]>(ACTIVE_PACKAGES_CACHE_KEY);
    if (cached) return cached;

    const packages = await this.packages.getActivePackages();
    await setCache(ACTIVE_PACKAGES_CACHE_KEY, packages);
    return packages;
  }

  async create(data: Partial<IPackage>): Promise<IPackage> {
    const created = await super.create(data);
    await invalidateCache(`${PACKAGE_CACHE_PREFIX}*`);
    return created;
  }

  async update(id: string, data: Partial<IPackage>): Promise<IPackage> {
    const updated = await super.update(id, data);
    await invalidateCache(`${PACKAGE_CACHE_PREFIX}*`);
    return updated;
  }

  async destroy(id: string): Promise<IPackage> {
    const deleted = await super.destroy(id);
    await invalidateCache(`${PACKAGE_CACHE_PREFIX}*`);
    return deleted;
  }
}

export const packageService = new PackageService();
export default packageService;
