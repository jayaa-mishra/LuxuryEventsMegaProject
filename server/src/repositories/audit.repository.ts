import AuditLog, { IAuditLog } from '../models/AuditLog';
import CrudRepository from './crud.repository';

/**
 * Audit-log data-access layer. Extends the generic CrudRepository and adds the
 * paginated, populated reads the audit screen needs.
 */
export class AuditRepository extends CrudRepository<IAuditLog> {
  constructor() {
    super(AuditLog);
  }

  async logAction(data: Partial<IAuditLog>): Promise<IAuditLog> {
    return this.create(data);
  }

  async getLogs(filter: Record<string, any> = {}, skip = 0, limit = 50): Promise<IAuditLog[]> {
    return AuditLog.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('performedBy', 'name email role');
  }

  async countLogs(filter: Record<string, any> = {}): Promise<number> {
    return this.count(filter);
  }
}

export const auditRepository = new AuditRepository();
export default auditRepository;
