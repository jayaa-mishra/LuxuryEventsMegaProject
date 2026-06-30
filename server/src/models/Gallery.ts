import mongoose, { Document, Schema } from 'mongoose';

interface IGalleryImage {
  url: string;
  public_id: string;
  is_primary: boolean;
}

interface IGalleryTestimonial {
  quote: string;
  author: string;
  role: string;
}

interface IGalleryStats {
  label: string;
  value: string;
}

export interface IGallery extends Document {
  title: string;
  description: string;
  category: string;
  images: IGalleryImage[];
  location?: string;
  year?: number;
  guestCount?: number;
  services?: string[];
  longDescription?: string;
  testimonial?: IGalleryTestimonial;
  stats?: IGalleryStats[];
}

const gallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        is_primary: { type: Boolean, default: false },
      },
    ],
    location: { type: String },
    year: { type: Number },
    guestCount: { type: Number },
    services: [{ type: String }],
    longDescription: { type: String },
    testimonial: {
      quote: { type: String },
      author: { type: String },
      role: { type: String },
    },
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);
export default Gallery;
