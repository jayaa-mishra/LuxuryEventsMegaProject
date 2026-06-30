import express from 'express';
import { createLead, getLeads, getLeadById, updateLeadStatus } from '../controllers/lead.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createLeadValidator, updateLeadStatusValidator } from '../middlewares/validators';

const router = express.Router();

router.route('/')
  .post(createLeadValidator, validateRequest, createLead)
  .get(protect, admin, getLeads);

router.route('/:id')
  .get(protect, admin, getLeadById)
  .put(protect, admin, updateLeadStatusValidator, validateRequest, updateLeadStatus);

export default router;
