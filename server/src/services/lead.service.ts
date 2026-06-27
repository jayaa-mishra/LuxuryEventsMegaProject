import Lead, { ILead } from '../models/Lead';
import { workflowService } from './workflow.service';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import { WorkflowState } from '../models/Workflow';

export const createLead = async (data: Partial<ILead>, userId?: string): Promise<ILead> => {
  const lead = await Lead.create(data);
  await workflowService.initializeWorkflow(lead._id.toString(), userId || 'system');
  await auditService.logAction('CREATE_LEAD', 'Lead', lead._id.toString(), userId, null, lead);
  return lead;
};

export const getAllLeads = async (): Promise<ILead[]> => {
  return await Lead.find({}).sort({ createdAt: -1 }).populate('desired_package');
};

export const getLeadById = async (id: string): Promise<ILead | null> => {
  return await Lead.findById(id).populate('desired_package');
};

export const updateLeadStatus = async (id: string, status: ILead['status'], userId?: string): Promise<ILead | null> => {
  const oldLead = await Lead.findById(id);
  const updated = await Lead.findByIdAndUpdate(id, { status }, { new: true });
  
  if (oldLead && updated) {
    await auditService.logAction('UPDATE_LEAD_STATUS', 'Lead', id, userId, oldLead.status, status);
    
    if (status === 'qualified') {
      const wf = await workflowService.getWorkflowByLeadOrBooking(id, 'lead');
      if (wf) {
        await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.QUALIFIED, userId || 'system', 'Lead marked as qualified');
      }
      await notificationService.sendNotification('admin', updated.email, 'Lead Qualified', `Lead ${updated.client_name} has been qualified.`, ['in_app', 'email']);
    } else if (status === 'converted') {
      await notificationService.sendNotification('admin', updated.email, 'Lead Converted', `Lead ${updated.client_name} has been converted.`, ['in_app']);
    }
  }
  
  return updated;
};
