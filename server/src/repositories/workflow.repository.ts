import Workflow, { IWorkflow, WorkflowState, IWorkflowTransition } from '../models/Workflow';
import CrudRepository from './crud.repository';

/**
 * Workflow data-access layer. Extends the generic CrudRepository and adds the
 * state-machine specific reads/updates (history is pushed atomically).
 */
export class WorkflowRepository extends CrudRepository<IWorkflow> {
  constructor() {
    super(Workflow);
  }

  async createWorkflow(data: Partial<IWorkflow>): Promise<IWorkflow> {
    return this.create(data);
  }

  async getWorkflowByLead(leadId: string): Promise<IWorkflow | null> {
    return Workflow.findOne({ lead_id: leadId }).populate('history.performedBy', 'name email');
  }

  async getWorkflowByBooking(bookingId: string): Promise<IWorkflow | null> {
    return Workflow.findOne({ booking_id: bookingId }).populate('history.performedBy', 'name email');
  }

  async getWorkflowById(id: string): Promise<IWorkflow | null> {
    return Workflow.findById(id).populate('history.performedBy', 'name email');
  }

  async updateWorkflowState(
    id: string,
    state: WorkflowState,
    transition: IWorkflowTransition,
  ): Promise<IWorkflow | null> {
    return Workflow.findByIdAndUpdate(
      id,
      {
        $set: { currentState: state },
        $push: { history: transition },
      },
      { new: true },
    ).populate('history.performedBy', 'name email');
  }
}

export const workflowRepository = new WorkflowRepository();
export default workflowRepository;
