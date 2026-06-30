import { Document } from 'mongoose';
import CrudRepository, { ListOptions } from '../repositories/crud.repository';
import { AppError } from '../utils/apiError';
import logger from '../utils/logger';

/**
 * Generic CRUD service.
 *
 * Port of the reference project's `crud-service.js`. Concrete services extend
 * this, inject their repository, and add business rules. Keeps controllers thin
 * and repositories dumb — the classic three-layer separation.
 */
export class CrudService<T extends Document> {
  protected readonly repository: CrudRepository<T>;
  protected readonly resourceName: string;

  constructor(repository: CrudRepository<T>, resourceName = 'Resource') {
    this.repository = repository;
    this.resourceName = resourceName;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      logger.error(`[CrudService] create failed for ${this.resourceName}: ${error}`);
      throw error;
    }
  }

  async get(id: string): Promise<T> {
    const resource = await this.repository.get(id);
    if (!resource) {
      throw AppError.notFound(`${this.resourceName} not found`);
    }
    return resource;
  }

  async getAll(options?: ListOptions): Promise<T[]> {
    return this.repository.getAll(options);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const updated = await this.repository.update(id, data as any);
    if (!updated) {
      throw AppError.notFound(`${this.resourceName} not found`);
    }
    return updated;
  }

  async destroy(id: string): Promise<T> {
    const deleted = await this.repository.destroy(id);
    if (!deleted) {
      throw AppError.notFound(`${this.resourceName} not found`);
    }
    return deleted;
  }
}

export default CrudService;
