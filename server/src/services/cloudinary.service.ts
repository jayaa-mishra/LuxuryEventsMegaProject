import cloudinary from '../config/cloudinary';

import { UploadApiOptions } from 'cloudinary';

export const uploadImageToCloudinary = async (fileBuffer: Buffer, folder: string, options: UploadApiOptions = {}): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto', ...options },
      (error, result) => {
        if (error) return reject(error);
        if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const deleteImageFromCloudinary = async (public_id: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};
