import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  transactionId?: string; 
  razorpayOrderId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  bookingId: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  paidAt?: Date;
  receiptUrl?: string;
  receiptNumber?: string;
}

const paymentSchema = new Schema<IPayment>({
  transactionId: { type: String },
  razorpayOrderId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  paidAt: { type: Date },
  receiptUrl: { type: String },
  receiptNumber: { type: String }
}, { timestamps: true });

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;
