import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `${info.timestamp} [notification-service] ${info.level}: ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
