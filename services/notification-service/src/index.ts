import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/serverConfig';
import apiRoutes from './routes';
import { startNotificationWorker } from './workers/notification.worker';
import { sendError } from './utils/apiResponse';
import logger from './utils/logger';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, service: 'notification-service', status: 'ok', uptime: process.uptime() });
});

app.use('/api', apiRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err?.message || 'Unhandled error');
  sendError(res, err?.message || 'Something went wrong', err?.statusCode || 500);
});

const start = () => {
  // Start the background worker (consumes the Redis queue)
  startNotificationWorker();

  app.listen(config.port, () => {
    logger.info(`notification-service running in ${config.env} mode on port ${config.port}`);
  });
};

start();

export default app;
