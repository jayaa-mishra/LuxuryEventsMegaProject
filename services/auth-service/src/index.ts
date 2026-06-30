import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import config from './config/serverConfig';
import connectDB from './config/db';
import apiRoutes from './routes';
import { errorHandler, notFound } from './middlewares';

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, service: 'auth-service', status: 'ok', uptime: process.uptime() });
});

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`[auth-service] running in ${config.env} mode on port ${config.port}`);
  });
};

start();

export default app;
