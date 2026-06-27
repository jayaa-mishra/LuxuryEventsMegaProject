import mongoose, { Document, Schema } from 'mongoose';

export enum WorkflowState {
  LEAD_CREATED = 'lead_created',
  QUALIFIED = 'qualified',
  PROPOSAL_SENT = 'proposal_sent',
  QUOTATION_APPROVED = 'quotation_approved',
  ADVANCE_PAID = 'advance_paid',
  PLANNING = 'planning',
  VENDOR_ALLOCATION = 'vendor_allocation',
  EVENT_READY = 'event_ready',
  EVENT_ONGOING = 'event_ongoing',
  EVENT_COMPLETED = 'event_completed',
  CLOSED = 'closed'
}

export interface IWorkflowTransition {
  fromState?: WorkflowState;
  toState: WorkflowState;
  performedBy?: mongoose.Types.ObjectId;
  timestamp: Date;
  notes?: string;
}

export interface IWorkflow extends Document {
  lead_id?: mongoose.Types.ObjectId;
  booking_id?: mongoose.Types.ObjectId;
  currentState: WorkflowState;
  history: IWorkflowTransition[];
}

const workflowTransitionSchema = new Schema<IWorkflowTransition>({
  fromState: { type: String, enum: Object.values(WorkflowState) },
  toState: { type: String, enum: Object.values(WorkflowState), required: true },
  performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  notes: { type: String }
});

const workflowSchema = new Schema<IWorkflow>(
  {
    lead_id: { type: Schema.Types.ObjectId, ref: 'Lead', index: true },
    booking_id: { type: Schema.Types.ObjectId, ref: 'Booking', index: true },
    currentState: { 
      type: String, 
      enum: Object.values(WorkflowState), 
      default: WorkflowState.LEAD_CREATED,
      index: true
    },
    history: [workflowTransitionSchema]
  },
  { timestamps: true }
);

const Workflow = mongoose.model<IWorkflow>('Workflow', workflowSchema);
export default Workflow;
