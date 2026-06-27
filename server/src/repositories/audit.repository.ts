import AuditLog, { IAuditLog } from '../models/AuditLog';

class AuditRepository {
  async logAction(data: Partial<IAuditLog>): Promise<IAuditLog> {
    return await AuditLog.create(data);
  }

  async getLogs(filter: Record<string, any> = {}, skip = 0, limit = 50): Promise<IAuditLog[]> {
    return await AuditLog.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('performedBy', 'name email role');
  }

  async countLogs(filter: Record<string, any> = {}): Promise<number> {
    return await AuditLog.countDocuments(filter);
  }
}

export const auditRepository = new AuditRepository();
