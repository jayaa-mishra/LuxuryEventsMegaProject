import { ILead } from '../models/Lead';
import { leadRepository, LeadRepository } from '../repositories/lead.repository';
import CrudService from './crud.service';
import { workflowService } from './workflow.service';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import { WorkflowState } from '../models/Workflow';
import { AppError } from '../utils/apiError';

/**
 * Lead business logic. CRUD comes from the base service; this class adds the
 * cross-cutting orchestration (workflow initialisation, audit trail,
 * notifications) that a lead's lifecycle requires.
 */
export class LeadService extends CrudService<ILead> {
  constructor(private readonly leads: LeadRepository = leadRepository) {
    super(leads, 'Lead');
  }

  async createLead(data: Partial<ILead>, userId?: string): Promise<ILead> {
    const lead = await this.leads.create(data);
    await workflowService.initializeWorkflow(lead._id.toString(), userId || 'system');
    await auditService.logAction('CREATE_LEAD', 'Lead', lead._id.toString(), userId, null, lead);
    return lead;
  }

  async getAllLeads(): Promise<ILead[]> {
    return this.leads.getAllWithPackage();
  }

  async getLeadById(id: string): Promise<ILead> {
    const lead = await this.leads.getByIdWithPackage(id);
    if (!lead) throw AppError.notFound('Lead not found');
    return lead;
  }

  async updateLeadStatus(id: string, status: ILead['status'], userId?: string): Promise<ILead | null> {
    const oldLead = await this.leads.get(id);
    const updated = await this.leads.updateStatus(id, status);

    if (oldLead && updated) {
      await auditService.logAction('UPDATE_LEAD_STATUS', 'Lead', id, userId, oldLead.status, status);
      await this.handleStatusSideEffects(updated, status, userId);
    }

    return updated;
  }

  private async handleStatusSideEffects(
    lead: ILead,
    status: ILead['status'],
    userId?: string,
  ): Promise<void> {
    if (status === 'qualified') {
      const wf = await workflowService.getWorkflowByLeadOrBooking(lead._id.toString(), 'lead');
      if (wf) {
        await workflowService.advanceWorkflow(
          wf._id.toString(),
          WorkflowState.QUALIFIED,
          userId || 'system',
          'Lead marked as qualified',
        );
      }
      await notificationService.sendNotification(
        'admin',
        lead.email,
        'Lead Qualified',
        `Lead ${lead.client_name} has been qualified.`,
        ['in_app', 'email'],
      );
    } else if (status === 'converted') {
      await notificationService.sendNotification(
        'admin',
        lead.email,
        'Lead Converted',
        `Lead ${lead.client_name} has been converted.`,
        ['in_app'],
      );
    }
  }
}

export const leadService = new LeadService();
export default leadService;
