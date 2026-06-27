import Quotation, { IQuotation } from '../models/Quotation';
import Lead from '../models/Lead';
import { workflowService } from './workflow.service';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import { WorkflowState } from '../models/Workflow';

export const createQuotation = async (data: Partial<IQuotation>, userId?: string): Promise<IQuotation> => {
  const quotation = await Quotation.create(data);
  await Lead.findByIdAndUpdate(data.lead_id, { status: 'quoted' });
  
  await auditService.logAction('CREATE_QUOTATION', 'Quotation', quotation._id.toString(), userId, null, quotation);
  
  const wf = await workflowService.getWorkflowByLeadOrBooking(data.lead_id!.toString(), 'lead');
  if (wf) {
    await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.PROPOSAL_SENT, userId || 'system', 'Quotation created');
  }

  await notificationService.sendNotification(data.lead_id!.toString(), undefined, 'Quotation Generated', 'A new quotation has been generated.', ['in_app']);
  
  return quotation;
};

export const getQuotations = async (): Promise<IQuotation[]> => {
  return await Quotation.find({}).populate('lead_id package_id');
};

export const getQuotationById = async (id: string): Promise<IQuotation | null> => {
  return await Quotation.findById(id).populate('lead_id package_id');
};

export const updateQuotationStatus = async (id: string, status: IQuotation['status'], userId?: string): Promise<IQuotation | null> => {
  const oldQuote = await Quotation.findById(id);
  const quote = await Quotation.findByIdAndUpdate(id, { status }, { new: true });
  
  if (oldQuote && quote) {
    await auditService.logAction('UPDATE_QUOTATION_STATUS', 'Quotation', id, userId, oldQuote.status, status);
    
    if (status === 'accepted') {
      const wf = await workflowService.getWorkflowByLeadOrBooking(quote.lead_id.toString(), 'lead');
      if (wf) {
        await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.QUOTATION_APPROVED, userId || 'system', 'Quotation accepted');
      }
      await notificationService.sendNotification(quote.lead_id.toString(), undefined, 'Quotation Accepted', 'Quotation has been accepted.', ['in_app']);
    } else if (status === 'rejected') {
      await notificationService.sendNotification(quote.lead_id.toString(), undefined, 'Quotation Rejected', 'Quotation has been rejected.', ['in_app']);
    }
  }
  
  return quote;
};
