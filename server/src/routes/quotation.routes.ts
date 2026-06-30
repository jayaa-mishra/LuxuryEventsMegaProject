import express from 'express';
import { 
  createQuotation, getQuotations, getQuotationById, updateQuotationStatus,
  generateQuotationPdf, regenerateQuotationPdf, getQuotationPdf, downloadQuotation, getQuotationHistory
} from '../controllers/quotation.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createQuotationValidator } from '../middlewares/validators';

const router = express.Router();

router.route('/')
  .get(protect, admin, getQuotations)
  .post(protect, admin, createQuotationValidator, validateRequest, createQuotation);

router.route('/:id')
  .get(protect, getQuotationById)
  .patch(protect, updateQuotationStatus);

router.route('/:id/generate').post(protect, admin, generateQuotationPdf);
router.route('/:id/regenerate').post(protect, admin, regenerateQuotationPdf);
router.route('/:id/pdf').get(protect, getQuotationPdf);
router.route('/:id/download').get(protect, downloadQuotation);
router.route('/:id/history').get(protect, getQuotationHistory);

export default router;
