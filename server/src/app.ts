import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import { notFound, errorHandler } from './middlewares/error.middleware';

// Route imports
import authRoutes from './routes/auth.routes';
import packageRoutes from './routes/package.routes';
import leadRoutes from './routes/lead.routes';
import quotationRoutes from './routes/quotation.routes';
import bookingRoutes from './routes/booking.routes';
import galleryRoutes from './routes/gallery.routes';
import uploadRoutes from './routes/upload.routes';
import analyticsRoutes from './routes/analytics.routes';
import workflowRoutes from './routes/workflow.routes';
import auditRoutes from './routes/audit.routes';
import paymentRoutes from './routes/payment.routes';
import notificationRoutes from './routes/notification.routes';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app: Application = express();

// Security Middlewares
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Standard Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Prevent NoSQL injections
// app.use(mongoSanitize());

// Prevent XSS attacks
// app.use(xss());

// Prevent HTTP Parameter Pollution
// app.use(hpp());

// Mount Routes
setupSwagger(app);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/packages', packageRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/quotations', quotationRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/workflows', workflowRoutes);
app.use('/api/v1/audit', auditRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Event Management Platform API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
