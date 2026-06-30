import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { quotationService } from '../services/quotation.service';
import * as quotationPdfService from '../services/quotationPdf.service';
import Booking from '../models/Booking';
import logger from '../utils/logger';
import { sendSuccess } from '../utils/apiResponse';
import { SuccessCodes } from '../utils/error-codes';
import { AppError } from '../utils/apiError';
import { getUserId } from '../utils/request';
import { AuthRequest } from '../middlewares/auth.middleware';

// Ownership check: admins can see everything; clients only quotations on their bookings.
const assertQuotationAccess = async (req: Request, quotationId: string): Promise<void> => {
  const user = (req as AuthRequest).user;
  if (user?.role === 'admin') return;
  if (!user) throw AppError.unauthorized();

  const booking = await Booking.findOne({ quotation_id: quotationId, client_id: user._id });
  if (!booking) throw AppError.forbidden('Not authorized to access this quotation');
};

export const createQuotation = asyncHandler(async (req: Request, res: Response) => {
  const quote = await quotationService.createQuotation(req.body, getUserId(req));
  sendSuccess(res, quote, 'Quotation created successfully', SuccessCodes.CREATED);
});

export const getQuotations = asyncHandler(async (_req: Request, res: Response) => {
  const quotes = await quotationService.getQuotations();
  sendSuccess(res, quotes, 'Quotations fetched successfully');
});

export const getQuotationById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await assertQuotationAccess(req, id);

  const quote = await quotationService.getQuotationById(id);
  if (!quote) throw AppError.notFound('Quotation not found');
  sendSuccess(res, quote, 'Quotation fetched successfully');
});

export const updateQuotationStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await assertQuotationAccess(req, id);

  const quote = await quotationService.updateQuotationStatus(id, req.body.status, getUserId(req));
  if (!quote) throw AppError.notFound('Quotation not found');
  logger.info(`Quotation ${req.body.status}: ${quote.quotationNumber || quote._id}`);
  sendSuccess(res, quote, 'Quotation status updated successfully');
});

export const generateQuotationPdf = asyncHandler(async (req: Request, res: Response) => {
  const quote = await quotationPdfService.generateQuotationPdf(req.params.id as string);
  sendSuccess(res, quote, 'Quotation PDF generated successfully');
});

export const regenerateQuotationPdf = asyncHandler(async (req: Request, res: Response) => {
  const quote = await quotationPdfService.regenerateQuotationPdf(req.params.id as string);
  sendSuccess(res, quote, 'Quotation PDF regenerated successfully');
});

export const getQuotationPdf = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await assertQuotationAccess(req, id);

  const quote = await quotationService.getQuotationById(id);
  if (!quote || !quote.pdfUrl) throw AppError.notFound('PDF not generated yet');
  sendSuccess(res, { pdfUrl: quote.pdfUrl }, 'Quotation PDF fetched successfully');
});

export const downloadQuotation = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await assertQuotationAccess(req, id);

  const quote = await quotationService.getQuotationById(id);
  if (!quote || !quote.pdfUrl) throw AppError.notFound('PDF not generated yet');

  logger.info(`Quotation Downloaded: ${quote.quotationNumber || quote._id}`);

  // Cloudinary supports forcing attachment download via `fl_attachment`.
  const parts = quote.pdfUrl.split('/upload/');
  if (parts.length === 2) {
    res.redirect(`${parts[0]}/upload/fl_attachment/${parts[1]}`);
  } else {
    res.redirect(quote.pdfUrl);
  }
});

export const getQuotationHistory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await assertQuotationAccess(req, id);

  const quote = await quotationService.getQuotationById(id);
  if (!quote) throw AppError.notFound('Quotation not found');
  sendSuccess(res, quote.history || [], 'Quotation history fetched successfully');
});
