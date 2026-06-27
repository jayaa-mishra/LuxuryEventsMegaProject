import express from 'express';
import { uploadImage } from '../controllers/upload.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), uploadImage);

export default router;
