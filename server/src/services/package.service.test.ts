import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the Redis helpers so no real client is created.
vi.mock('../config/redis', () => ({
  getCache: vi.fn(),
  setCache: vi.fn(),
  invalidateCache: vi.fn(),
}));

import { PackageService } from './package.service';
import * as redis from '../config/redis';

const makeRepo = () =>
  ({
    getActivePackages: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
    get: vi.fn(),
    getAll: vi.fn(),
  }) as any;

describe('PackageService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns cached active packages without touching the repository', async () => {
    (redis.getCache as any).mockResolvedValueOnce([{ name: 'cached' }]);
    const repo = makeRepo();
    const svc = new PackageService(repo);

    const result = await svc.getActivePackages();

    expect(result).toEqual([{ name: 'cached' }]);
    expect(repo.getActivePackages).not.toHaveBeenCalled();
  });

  it('reads from the repository and caches on a cache miss', async () => {
    (redis.getCache as any).mockResolvedValueOnce(null);
    const repo = makeRepo();
    repo.getActivePackages.mockResolvedValue([{ name: 'fresh' }]);
    const svc = new PackageService(repo);

    const result = await svc.getActivePackages();

    expect(repo.getActivePackages).toHaveBeenCalledOnce();
    expect(redis.setCache).toHaveBeenCalledWith('packages:active', [{ name: 'fresh' }]);
    expect(result).toEqual([{ name: 'fresh' }]);
  });

  it('invalidates the cache on create/update/destroy', async () => {
    const repo = makeRepo();
    repo.create.mockResolvedValue({ name: 'x' });
    repo.update.mockResolvedValue({ name: 'x' });
    repo.destroy.mockResolvedValue({ name: 'x' });
    const svc = new PackageService(repo);

    await svc.create({ name: 'x' } as any);
    await svc.update('id', { name: 'x' } as any);
    await svc.destroy('id');

    expect(redis.invalidateCache).toHaveBeenCalledTimes(3);
    expect(redis.invalidateCache).toHaveBeenCalledWith('packages:*');
  });
});
