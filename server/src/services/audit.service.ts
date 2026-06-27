import { auditRepository } from '../repositories/audit.repository';

class AuditService {
  async logAction(
    action: string,
    entityType: string,
    entityId: string,
    performedBy?: string,
    oldValue?: any,
    newValue?: any,
    ipAddress?: string
  ) {
    try {
      await auditRepository.logAction({
        action,
        entityType,
        entityId,
        performedBy: performedBy as any,
        oldValue,
        newValue,
        ipAddress
      });
    } catch (error) {
      console.error('Failed to write audit log:', error);
      // We don't throw here to avoid failing critical business operations just because an audit log failed
    }
  }

  async getLogs(filter: Record<string, any>, skip: number, limit: number) {
    const logs = await auditRepository.getLogs(filter, skip, limit);
    const total = await auditRepository.countLogs(filter);
    return { logs, total, pages: Math.ceil(total / limit) };
  }
}

export const auditService = new AuditService();
