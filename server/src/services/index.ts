/**
 * Service registry. Mirrors `services/index.js` from the reference project.
 * Every concrete service extends the shared CrudService base (analytics is the
 * one exception — it aggregates across collections and owns no model).
 */
export { CrudService } from './crud.service';
export { packageService, PackageService } from './package.service';
export { leadService, LeadService } from './lead.service';
export { bookingService, BookingService } from './booking.service';
export { quotationService, QuotationService } from './quotation.service';
export { galleryService, GalleryService } from './gallery.service';
export { paymentService } from './payment.service';
export { analyticsService, AnalyticsService } from './analytics.service';
export { auditService } from './audit.service';
export { notificationService } from './notification.service';
export { workflowService } from './workflow.service';
