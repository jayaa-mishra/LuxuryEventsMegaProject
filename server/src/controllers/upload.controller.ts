import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { uploadImageToCloudinary } from '../services/cloudinary.service';
import { sendSuccess } from '../utils/apiResponse';
import { SuccessCodes } from '../utils/error-codes';
import { AppError } from '../utils/apiError';

// @desc    Upload image to Cloudinary
// @route   POST /api/v1/upload
// @access  Private/Admin
export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw AppError.badRequest('No image file provided');

  const result = await uploadImageToCloudinary(req.file.buffer, 'luxury-events');
  sendSuccess(
    res,
    { url: result.url, public_id: result.public_id },
    'Image uploaded successfully',
    SuccessCodes.CREATED,
  );
});
