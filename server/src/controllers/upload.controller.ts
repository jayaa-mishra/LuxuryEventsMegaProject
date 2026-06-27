import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { uploadImageToCloudinary } from '../services/cloudinary.service';

// @desc    Upload image to Cloudinary
// @route   POST /api/v1/upload
// @access  Private/Admin
export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided');
  }

  const result = await uploadImageToCloudinary(req.file.buffer, 'luxury-events');
  
  res.status(201).json({
    url: result.url,
    public_id: result.public_id,
  });
});
