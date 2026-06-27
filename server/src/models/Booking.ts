import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  client_id: mongoose.Types.ObjectId;
  package_id?: mongoose.Types.ObjectId;
  quotation_id?: mongoose.Types.ObjectId;
  event_date: Date;
  venue: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'partial' | 'paid';
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const bookingSchema = new Schema<IBooking>(
  {
    client_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    package_id: { type: Schema.Types.ObjectId, ref: 'Package', index: true },
    quotation_id: { type: Schema.Types.ObjectId, ref: 'Quotation', index: true },
    event_date: { type: Date, required: true },
    venue: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    payment_status: {
      type: String,
      enum: ['pending', 'partial', 'paid'],
      default: 'pending',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
