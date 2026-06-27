import mongoose, { Document, Schema } from 'mongoose';

export interface IPackage extends Document {
  name: string;
  description: string;
  base_price: number;
  features: string[];
  category: string;
  is_active: boolean;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const packageSchema = new Schema<IPackage>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    base_price: { type: Number, required: true },
    features: [{ type: String }],
    category: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Package = mongoose.model<IPackage>('Package', packageSchema);
export default Package;
