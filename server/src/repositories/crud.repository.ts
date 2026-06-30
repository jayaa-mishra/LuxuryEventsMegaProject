import { Model, Document, UpdateQuery, PopulateOptions } from 'mongoose';
import logger from '../utils/logger';

/** Loose filter type — the repository is the boundary to the ODM. */
export type QueryFilter = Record<string, any>;

export interface ListOptions {
  filter?: QueryFilter;
  sort?: Record<string, 1 | -1>;
  populate?: string | PopulateOptions | (string | PopulateOptions)[];
  limit?: number;
  skip?: number;
}

/**
 * Generic CRUD repository.
 *
 * Direct port of the reference project's `crud-repository.js` to a typed,
 * Mongoose-backed base class. Every concrete repository extends this and only
 * adds domain-specific queries — exactly like the Airline repositories extend
 * the shared CRUD base.
 */
export class CrudRepository<T extends Document> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.model.create(data);
    } catch (error) {
      logger.error(`[CrudRepository] create failed for ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async get(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      logger.error(`[CrudRepository] get failed for ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async getAll(options: ListOptions = {}): Promise<T[]> {
    try {
      const query = this.model.find((options.filter ?? {}) as any);
      if (options.sort) query.sort(options.sort);
      if (options.skip) query.skip(options.skip);
      if (options.limit) query.limit(options.limit);
      if (options.populate) query.populate(options.populate as any);
      return await query.exec();
    } catch (error) {
      logger.error(`[CrudRepository] getAll failed for ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async findOne(filter: QueryFilter): Promise<T | null> {
    try {
      return await this.model.findOne(filter as any);
    } catch (error) {
      logger.error(`[CrudRepository] findOne failed for ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } catch (error) {
      logger.error(`[CrudRepository] update failed for ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async destroy(id: string): Promise<T | null> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`[CrudRepository] destroy failed for ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async count(filter: QueryFilter = {}): Promise<number> {
    try {
      return await this.model.countDocuments(filter as any);
    } catch (error) {
      logger.error(`[CrudRepository] count failed for ${this.model.modelName}: ${error}`);
      throw error;
    }
  }
}

export default CrudRepository;
