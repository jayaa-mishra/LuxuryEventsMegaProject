import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as quotationService from '../services/quotation.service';
import * as quotationPdfService from '../services/quotationPdf.service';
import Booking from '../models/Booking';
import logger from '../utils/logger';

// Ownership Check Utility
const verifyQuotationOwnership = async (req: Request, quotationId: string) => {
  const user = (req as any).user;
  if (user && user.role === 'admin') return true;
  if (!user) return false;
  
  const booking = await Booking.findOne({ quotation_id: quotationId, client_id: user._id });
  return !!booking;
};

export const createQuotation = asyncHandler(async (req: Request, res: Response) => {
  const quote = await quotationService.createQuotation(req.body);
  res.status(201).json(quote);
});

export const getQuotations = asyncHandler(async (req: Request, res: Response) => {
  const quotes = await quotationService.getQuotations();
  res.json(quotes);
});

export const getQuotationById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const hasAccess = await verifyQuotationOwnership(req, id);
  if (!hasAccess) { res.status(403); throw new Error('Not authorized to access this quotation'); }

  const quote = await quotationService.getQuotationById(id);
  if (quote) res.json(quote);
  else { res.status(404); throw new Error('Quotation not found'); }
});

export const updateQuotationStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const hasAccess = await verifyQuotationOwnership(req, id);
  if (!hasAccess) { res.status(403); throw new Error('Not authorized'); }

  const userId = (req as any).user ? (req as any).user._id.toString() : undefined;
  const quote = await quotationService.updateQuotationStatus(id, req.body.status, userId);
  if (quote) {
    logger.info(`Quotation ${req.body.status}: ${quote.quotationNumber || quote._id}`);
    res.json(quote);
  }
  else { res.status(404); throw new Error('Quotation not found'); }
});

export const generateQuotationPdf = asyncHandler(async (req: Request, res: Response) => {
  const quote = await quotationPdfService.generateQuotationPdf(req.params.id as string);
  res.json(quote);
});

export const regenerateQuotationPdf = asyncHandler(async (req: Request, res: Response) => {
  const quote = await quotationPdfService.regenerateQuotationPdf(req.params.id as string);
  res.json(quote);
});

export const getQuotationPdf = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const hasAccess = await verifyQuotationOwnership(req, id);
  if (!hasAccess) { res.status(403); throw new Error('Not authorized'); }

  const quote = await quotationService.getQuotationById(id);
  if (quote && quote.pdfUrl) {
    res.json({ pdfUrl: quote.pdfUrl });
  } else {
    res.status(404); throw new Error('PDF not generated yet');
  }
});

export const downloadQuotation = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const hasAccess = await verifyQuotationOwnership(req, id);
  if (!hasAccess) { res.status(403); throw new Error('Not authorized'); }

  const quote = await quotationService.getQuotationById(id);
  if (quote && quote.pdfUrl) {
    logger.info(`Quotation Downloaded: ${quote.quotationNumber || quote._id}`);
    
    // Cloudinary supports forcing attachment download by injecting `fl_attachment` 
    // Example: https://res.cloudinary.com/demo/image/upload/fl_attachment/v1234/sample.pdf
    const parts = quote.pdfUrl.split('/upload/');
    if (parts.length === 2) {
      const downloadUrl = `${parts[0]}/upload/fl_attachment/${parts[1]}`;
      res.redirect(downloadUrl);
    } else {
      res.redirect(quote.pdfUrl);
    }
  } else {
    res.status(404); throw new Error('PDF not generated yet');
  }
});

export const getQuotationHistory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const hasAccess = await verifyQuotationOwnership(req, id);
  if (!hasAccess) { res.status(403); throw new Error('Not authorized'); }

  const quote = await quotationService.getQuotationById(id);
  if (quote) {
    res.json(quote.history || []);
  } else {
    res.status(404); throw new Error('Quotation not found');
  }
});
