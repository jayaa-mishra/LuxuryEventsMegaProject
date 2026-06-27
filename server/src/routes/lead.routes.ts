import express from 'express';
import { createLead, getLeads, getLeadById, updateLeadStatus } from '../controllers/lead.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/')
  .post(createLead)
  .get(protect, admin, getLeads);

router.route('/:id')
  .get(protect, admin, getLeadById)
  .put(protect, admin, updateLeadStatus);

export default router;
