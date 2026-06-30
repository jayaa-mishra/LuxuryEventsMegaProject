import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from './config';

const app: Application = express();

app.use(helmet());
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));
app.use(cors({ origin: config.clientUrl, credentials: true }));

// Gateway-level rate limiting (first line of defence before any service).
app.use(
  '/api',
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, service: 'api-gateway', status: 'ok', routes: config.services });
});

/**
 * Routing table. We use `pathFilter` (not a mount path) so the *full* original
 * URL is preserved and forwarded — each downstream service already namespaces
 * its routes under `/api/v1/...`. Order matters: the auth filter is registered
 * before the catch-all main filter so `/api/v1/auth/*` is claimed first.
 *
 *   /api/v1/auth/*          -> auth-service          (path forwarded as-is)
 *   /internal/notifications -> notification-service  (rewritten to /api/v1/notifications)
 *   /api/*                  -> main API              (packages, leads, bookings, ...)
 */
app.use(
  createProxyMiddleware({
    target: config.services.auth,
    changeOrigin: true,
    xfwd: true,
    pathFilter: '/api/v1/auth',
  }),
);

app.use(
  createProxyMiddleware({
    target: config.services.notification,
    changeOrigin: true,
    xfwd: true,
    pathFilter: '/internal/notifications',
    pathRewrite: { '^/internal/notifications': '/api/v1/notifications' },
  }),
);

app.use(
  createProxyMiddleware({
    target: config.services.main,
    changeOrigin: true,
    xfwd: true,
    pathFilter: '/api',
  }),
);

app.listen(config.port, () => {
  console.log(`[api-gateway] running in ${config.env} mode on port ${config.port}`);
  console.log(`[api-gateway] routing: ${JSON.stringify(config.services)}`);
});

export default app;
