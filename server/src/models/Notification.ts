import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  channels: ('in_app' | 'email' | 'sms')[];
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['success', 'warning', 'error', 'info'], default: 'info' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  link: { type: String },
  channels: [{ type: String, enum: ['in_app', 'email', 'sms'] }]
}, { timestamps: true });

const Notification = mongoose.model<INotification>('Notification', notificationSchema);
export default Notification;
