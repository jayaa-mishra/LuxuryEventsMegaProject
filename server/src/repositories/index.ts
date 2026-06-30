/**
 * Repository registry. Mirrors `repository/index.js` from the reference project.
 * Every concrete repository extends the shared CrudRepository base.
 */
export { CrudRepository } from './crud.repository';
export { packageRepository, PackageRepository } from './package.repository';
export { leadRepository, LeadRepository } from './lead.repository';
export { bookingRepository, BookingRepository } from './booking.repository';
export { quotationRepository, QuotationRepository } from './quotation.repository';
export { galleryRepository, GalleryRepository } from './gallery.repository';
export { paymentRepository, PaymentRepository } from './payment.repository';
export { auditRepository, AuditRepository } from './audit.repository';
export { notificationRepository, NotificationRepository } from './notification.repository';
export { workflowRepository, WorkflowRepository } from './workflow.repository';
