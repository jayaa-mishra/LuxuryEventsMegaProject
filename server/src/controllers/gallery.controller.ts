import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { galleryService } from '../services/gallery.service';
import { sendSuccess } from '../utils/apiResponse';
import { SuccessCodes } from '../utils/error-codes';

export const getGalleries = asyncHandler(async (_req: Request, res: Response) => {
  const galleries = await galleryService.getGalleries();
  sendSuccess(res, galleries, 'Galleries fetched successfully');
});

export const getGalleryById = asyncHandler(async (req: Request, res: Response) => {
  const gallery = await galleryService.getGalleryById(req.params.id as string);
  sendSuccess(res, gallery, 'Gallery fetched successfully');
});

export const createGallery = asyncHandler(async (req: Request, res: Response) => {
  const gallery = await galleryService.createGallery(req.body);
  sendSuccess(res, gallery, 'Gallery created successfully', SuccessCodes.CREATED);
});

export const deleteGallery = asyncHandler(async (req: Request, res: Response) => {
  await galleryService.deleteGallery(req.params.id as string);
  sendSuccess(res, null, 'Gallery removed successfully');
});
