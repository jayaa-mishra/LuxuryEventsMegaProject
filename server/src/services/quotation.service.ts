import { IQuotation } from '../models/Quotation';
import Lead from '../models/Lead';
import { quotationRepository, QuotationRepository } from '../repositories/quotation.repository';
import CrudService from './crud.service';
import { workflowService } from './workflow.service';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import { WorkflowState } from '../models/Workflow';

/**
 * Quotation business logic. CRUD from the base service; the lifecycle
 * orchestration (lead status update, workflow advance, audit, notifications)
 * lives here.
 */
export class QuotationService extends CrudService<IQuotation> {
  constructor(private readonly quotations: QuotationRepository = quotationRepository) {
    super(quotations, 'Quotation');
  }

  async createQuotation(data: Partial<IQuotation>, userId?: string): Promise<IQuotation> {
    const quotation = await this.quotations.create(data);
    // Note: 'quoted' is set directly (skips schema enum validation) to mirror existing behaviour.
    await Lead.findByIdAndUpdate(data.lead_id, { status: 'quoted' });

    await auditService.logAction('CREATE_QUOTATION', 'Quotation', quotation._id.toString(), userId, null, quotation);

    const wf = await workflowService.getWorkflowByLeadOrBooking(data.lead_id!.toString(), 'lead');
    if (wf) {
      await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.PROPOSAL_SENT, userId || 'system', 'Quotation created');
    }

    await notificationService.sendNotification(data.lead_id!.toString(), undefined, 'Quotation Generated', 'A new quotation has been generated.', ['in_app']);
    return quotation;
  }

  async getQuotations(): Promise<IQuotation[]> {
    return this.quotations.getAllPopulated();
  }

  async getQuotationById(id: string): Promise<IQuotation | null> {
    return this.quotations.getByIdPopulated(id);
  }

  async updateQuotationStatus(
    id: string,
    status: IQuotation['status'],
    userId?: string,
  ): Promise<IQuotation | null> {
    const oldQuote = await this.quotations.get(id);
    const quote = await this.quotations.updateStatus(id, status);

    if (oldQuote && quote) {
      await auditService.logAction('UPDATE_QUOTATION_STATUS', 'Quotation', id, userId, oldQuote.status, status);
      await this.handleStatusSideEffects(quote, status, userId);
    }

    return quote;
  }

  private async handleStatusSideEffects(
    quote: IQuotation,
    status: IQuotation['status'],
    userId?: string,
  ): Promise<void> {
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
}

export const quotationService = new QuotationService();
export default quotationService;
