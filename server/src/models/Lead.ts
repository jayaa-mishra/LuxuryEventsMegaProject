import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  client_name: string;
  email: string;
  phone: string;
  event_date: Date;
  desired_package?: mongoose.Types.ObjectId;
  guest_count: number;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  updatedBy?: mongoose.Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
  {
    client_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    event_date: { type: Date, required: true },
    desired_package: { type: Schema.Types.ObjectId, ref: 'Package', index: true },
    guest_count: { type: Number, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'],
      default: 'new',
      index: true,
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Lead = mongoose.model<ILead>('Lead', leadSchema);
export default Lead;
