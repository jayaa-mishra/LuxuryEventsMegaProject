import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  entityType: string;
  entityId: string;
  action: string;
  oldValue?: mongoose.Schema.Types.Mixed;
  newValue?: mongoose.Schema.Types.Mixed;
  performedBy?: mongoose.Types.ObjectId;
  ipAddress?: string;
  timestamp: Date;
}

const auditLogSchema = new Schema<IAuditLog>({
  entityType: { type: String, required: true, index: true },
  entityId: { type: String, required: true, index: true },
  action: { type: String, required: true },
  oldValue: { type: Schema.Types.Mixed },
  newValue: { type: Schema.Types.Mixed },
  performedBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  ipAddress: { type: String },
  timestamp: { type: Date, default: Date.now, index: true }
});

const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
export default AuditLog;
