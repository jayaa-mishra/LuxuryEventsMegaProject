import mongoose, { Document, Schema } from 'mongoose';

export interface IWebhookLog extends Document {
  eventId: string;
  eventType: string;
  payload: any;
  signature: string;
  processedAt: Date;
  status: 'processing' | 'processed' | 'failed' | 'ignored';
  error?: string;
}

const webhookLogSchema = new Schema<IWebhookLog>({
  eventId: { type: String, required: true, unique: true, index: true },
  eventType: { type: String, required: true },
  payload: { type: Schema.Types.Mixed, required: true },
  signature: { type: String, required: true },
  processedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['processing', 'processed', 'failed', 'ignored'], default: 'processing' },
  error: { type: String }
}, { timestamps: true });

const WebhookLog = mongoose.model<IWebhookLog>('WebhookLog', webhookLogSchema);
export default WebhookLog;
