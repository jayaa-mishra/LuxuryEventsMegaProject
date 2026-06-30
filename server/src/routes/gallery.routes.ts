import express from 'express';
import { getGalleries, getGalleryById, createGallery, deleteGallery } from '../controllers/gallery.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createGalleryValidator } from '../middlewares/validators';

const router = express.Router();

router.route('/')
  .get(getGalleries)
  .post(protect, admin, createGalleryValidator, validateRequest, createGallery);

router.route('/:id')
  .get(getGalleryById)
  .delete(protect, admin, deleteGallery);

export default router;
