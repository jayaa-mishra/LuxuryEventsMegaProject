import { body, param } from 'express-validator';
import { WorkflowState } from '../models/Workflow';

/**
 * Reusable express-validator chains for the main write endpoints.
 * Pair each with `validateRequest` in the route definition.
 */

export const createPackageValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('base_price').isNumeric().withMessage('base_price must be a number'),
  body('category').trim().notEmpty().withMessage('Category is required'),
];

export const updatePackageValidator = [
  param('id').isMongoId().withMessage('Invalid package id'),
  body('base_price').optional().isNumeric().withMessage('base_price must be a number'),
];

export const createLeadValidator = [
  body('client_name').trim().notEmpty().withMessage('client_name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('phone is required'),
  body('event_date').isISO8601().withMessage('event_date must be a valid date'),
  body('guest_count').isInt({ min: 1 }).withMessage('guest_count must be a positive integer'),
  body('budget').trim().notEmpty().withMessage('budget is required'),
  body('message').trim().notEmpty().withMessage('message is required'),
];

export const updateLeadStatusValidator = [
  param('id').isMongoId().withMessage('Invalid lead id'),
  body('status')
    .isIn(['new', 'contacted', 'qualified', 'converted', 'rejected'])
    .withMessage('Invalid lead status'),
];

export const createBookingValidator = [
  body('client_id').isMongoId().withMessage('Valid client_id is required'),
  body('event_date').isISO8601().withMessage('event_date must be a valid date'),
  body('venue').trim().notEmpty().withMessage('venue is required'),
];

export const updateBookingStatusValidator = [
  param('id').isMongoId().withMessage('Invalid booking id'),
  body('status')
    .isIn(['pending', 'approved', 'in_progress', 'completed', 'cancelled'])
    .withMessage('Invalid booking status'),
];

export const createQuotationValidator = [
  body('lead_id').isMongoId().withMessage('Valid lead_id is required'),
  body('total_amount').isNumeric().withMessage('total_amount must be a number'),
  body('validUntil').isISO8601().withMessage('validUntil must be a valid date'),
];

export const createGalleryValidator = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('description').trim().notEmpty().withMessage('description is required'),
  body('category').trim().notEmpty().withMessage('category is required'),
];

export const advanceWorkflowValidator = [
  param('id').isMongoId().withMessage('Invalid workflow id'),
  body('state').isIn(Object.values(WorkflowState)).withMessage('Invalid target state'),
];

