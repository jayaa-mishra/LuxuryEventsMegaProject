import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as galleryService from '../services/gallery.service';

export const getGalleries = asyncHandler(async (req: Request, res: Response) => {
  const galleries = await galleryService.getGalleries();
  res.json(galleries);
});

export const getGalleryById = asyncHandler(async (req: Request, res: Response) => {
  const gallery = await galleryService.getGalleryById(req.params.id as string);
  if (gallery) res.json(gallery);
  else { res.status(404); throw new Error('Gallery not found'); }
});

export const createGallery = asyncHandler(async (req: Request, res: Response) => {
  const gallery = await galleryService.createGallery(req.body);
  res.status(201).json(gallery);
});

export const deleteGallery = asyncHandler(async (req: Request, res: Response) => {
  await galleryService.deleteGallery(req.params.id as string);
  res.json({ message: 'Gallery removed' });
});
