import mongoose, { Document, Schema } from 'mongoose';

interface IGalleryImage {
  url: string;
  public_id: string;
  is_primary: boolean;
}

export interface IGallery extends Document {
  title: string;
  description: string;
  category: string;
  images: IGalleryImage[];
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
  },
  { timestamps: true }
);

const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema);
export default Gallery;
