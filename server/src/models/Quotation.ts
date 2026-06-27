import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomerSnapshot {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface IEventSnapshot {
  eventType: string;
  eventDate: Date;
  guestCount: number;
  requirements?: string;
}

export interface IPackageSnapshot {
  packageName: string;
  packageDescription?: string;
  packageFeatures: string[];
  packagePrice: number;
}

export interface IPricingSnapshot {
  venueCost: number;
  decorationCost: number;
  photographyCost: number;
  videographyCost: number;
  entertainmentCost: number;
  cateringCost: number;
  transportationCost: number;
  additionalServicesCost: number;
  discountAmount: number;
  taxPercentage: number;
  taxAmount: number;
  grandTotal: number;
}

export interface IQuotationHistory {
  version: number;
  pdfUrl: string;
  generatedAt: Date;
}

export interface IQuotation extends Document {
  quotationNumber: string;
  lead_id: mongoose.Types.ObjectId;
  package_id?: mongoose.Types.ObjectId;
  custom_additions?: string;
  total_amount: number;
  validUntil: Date;
  generatedAt?: Date;
  pdfUrl?: string;
  versionNumber: number;
  status: 'draft' | 'generated' | 'sent' | 'accepted' | 'rejected' | 'expired';
  customerSnapshot?: ICustomerSnapshot;
  eventSnapshot?: IEventSnapshot;
  packageSnapshot?: IPackageSnapshot;
  pricingSnapshot?: IPricingSnapshot;
  history: IQuotationHistory[];
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const quotationSchema = new Schema<IQuotation>(
  {
    quotationNumber: { type: String, unique: true, sparse: true, index: true },
    lead_id: { type: Schema.Types.ObjectId, ref: 'Lead', required: true, index: true },
    package_id: { type: Schema.Types.ObjectId, ref: 'Package', index: true },
    custom_additions: { type: String },
    total_amount: { type: Number, required: true },
    validUntil: { type: Date, required: true },
    generatedAt: { type: Date },
    pdfUrl: { type: String },
    versionNumber: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ['draft', 'generated', 'sent', 'accepted', 'rejected', 'expired'],
      default: 'draft',
      index: true,
    },
    customerSnapshot: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String },
    },
    eventSnapshot: {
      eventType: { type: String },
      eventDate: { type: Date },
      guestCount: { type: Number },
      requirements: { type: String },
    },
    packageSnapshot: {
      packageName: { type: String },
      packageDescription: { type: String },
      packageFeatures: [{ type: String }],
      packagePrice: { type: Number },
    },
    pricingSnapshot: {
      venueCost: { type: Number, default: 0 },
      decorationCost: { type: Number, default: 0 },
      photographyCost: { type: Number, default: 0 },
      videographyCost: { type: Number, default: 0 },
      entertainmentCost: { type: Number, default: 0 },
      cateringCost: { type: Number, default: 0 },
      transportationCost: { type: Number, default: 0 },
      additionalServicesCost: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      taxPercentage: { type: Number, default: 0 },
      taxAmount: { type: Number, default: 0 },
      grandTotal: { type: Number, default: 0 },
    },
    history: [
      {
        version: { type: Number },
        pdfUrl: { type: String },
        generatedAt: { type: Date },
      }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Quotation = mongoose.model<IQuotation>('Quotation', quotationSchema);
export default Quotation;
