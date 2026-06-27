import { workflowRepository } from '../repositories/workflow.repository';
import { WorkflowState } from '../models/Workflow';
import mongoose from 'mongoose';
import { auditService } from './audit.service';

const validTransitions: Record<WorkflowState, WorkflowState[]> = {
  [WorkflowState.LEAD_CREATED]: [WorkflowState.QUALIFIED, WorkflowState.CLOSED],
  [WorkflowState.QUALIFIED]: [WorkflowState.PROPOSAL_SENT, WorkflowState.CLOSED],
  [WorkflowState.PROPOSAL_SENT]: [WorkflowState.QUOTATION_APPROVED, WorkflowState.CLOSED],
  [WorkflowState.QUOTATION_APPROVED]: [WorkflowState.ADVANCE_PAID, WorkflowState.CLOSED],
  [WorkflowState.ADVANCE_PAID]: [WorkflowState.PLANNING, WorkflowState.CLOSED],
  [WorkflowState.PLANNING]: [WorkflowState.VENDOR_ALLOCATION, WorkflowState.CLOSED],
  [WorkflowState.VENDOR_ALLOCATION]: [WorkflowState.EVENT_READY, WorkflowState.CLOSED],
  [WorkflowState.EVENT_READY]: [WorkflowState.EVENT_ONGOING, WorkflowState.CLOSED],
  [WorkflowState.EVENT_ONGOING]: [WorkflowState.EVENT_COMPLETED, WorkflowState.CLOSED],
  [WorkflowState.EVENT_COMPLETED]: [WorkflowState.CLOSED],
  [WorkflowState.CLOSED]: []
};

class WorkflowService {
  async initializeWorkflow(leadId: string, performedBy: string): Promise<any> {
    const workflow = await workflowRepository.createWorkflow({
      lead_id: leadId as any,
      currentState: WorkflowState.LEAD_CREATED,
      history: [{
        toState: WorkflowState.LEAD_CREATED,
        performedBy: performedBy as any,
        timestamp: new Date(),
        notes: 'Workflow initialized'
      }]
    });

    await auditService.logAction('INITIALIZE_WORKFLOW', 'Workflow', workflow._id.toString(), performedBy, null, WorkflowState.LEAD_CREATED);
    return workflow;
  }

  async advanceWorkflow(id: string, targetState: WorkflowState, performedBy: string, notes?: string): Promise<any> {
    const workflow = await workflowRepository.getWorkflowById(id);
    if (!workflow) throw new Error('Workflow not found');

    const allowedNextStates = validTransitions[workflow.currentState];
    if (!allowedNextStates.includes(targetState)) {
      throw new Error(`Invalid workflow transition from ${workflow.currentState} to ${targetState}`);
    }

    const updated = await workflowRepository.updateWorkflowState(id, targetState, {
      fromState: workflow.currentState,
      toState: targetState,
      performedBy: performedBy as any,
      timestamp: new Date(),
      notes
    });

    await auditService.logAction('ADVANCE_WORKFLOW', 'Workflow', workflow._id.toString(), performedBy, workflow.currentState, targetState);
    return updated;
  }

  async attachBooking(id: string, bookingId: string, performedBy: string): Promise<any> {
    const workflow = await workflowRepository.getWorkflowById(id);
    if (!workflow) throw new Error('Workflow not found');
    
    workflow.booking_id = bookingId as any;
    await workflow.save();
    
    await auditService.logAction('ATTACH_BOOKING', 'Workflow', workflow._id.toString(), performedBy, null, bookingId);
    return workflow;
  }

  async getWorkflowByLeadOrBooking(queryId: string, type: 'lead' | 'booking') {
    if (type === 'lead') return await workflowRepository.getWorkflowByLead(queryId);
    return await workflowRepository.getWorkflowByBooking(queryId);
  }
}

export const workflowService = new WorkflowService();
