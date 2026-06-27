import Workflow, { IWorkflow, WorkflowState, IWorkflowTransition } from '../models/Workflow';

class WorkflowRepository {
  async createWorkflow(data: Partial<IWorkflow>): Promise<IWorkflow> {
    return await Workflow.create(data);
  }

  async getWorkflowByLead(leadId: string): Promise<IWorkflow | null> {
    return await Workflow.findOne({ lead_id: leadId }).populate('history.performedBy', 'name email');
  }

  async getWorkflowByBooking(bookingId: string): Promise<IWorkflow | null> {
    return await Workflow.findOne({ booking_id: bookingId }).populate('history.performedBy', 'name email');
  }

  async getWorkflowById(id: string): Promise<IWorkflow | null> {
    return await Workflow.findById(id).populate('history.performedBy', 'name email');
  }

  async updateWorkflowState(id: string, state: WorkflowState, transition: IWorkflowTransition): Promise<IWorkflow | null> {
    return await Workflow.findByIdAndUpdate(
      id,
      {
        $set: { currentState: state },
        $push: { history: transition }
      },
      { new: true }
    ).populate('history.performedBy', 'name email');
  }
}

export const workflowRepository = new WorkflowRepository();
