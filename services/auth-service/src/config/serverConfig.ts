import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5001),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  // Short-lived access token; the frontend silently refreshes it.
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  // Separate secret for refresh tokens; falls back to a derived value if unset.
  JWT_REFRESH_SECRET: Joi.string().allow('').optional(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  // Refresh-token lifetime in days, used to set the DB expiry + cookie maxAge.
  REFRESH_EXPIRES_DAYS: Joi.number().default(7),
  CLIENT_URL: Joi.string().default('http://localhost:5173'),
}).unknown();

const { value: envVars, error } = schema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`[auth-service] Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV as string,
  isProd: envVars.NODE_ENV === 'production',
  port: envVars.PORT as number,
  mongoUri: envVars.MONGO_URI as string,
  jwt: {
    secret: envVars.JWT_SECRET as string,
    accessExpiresIn: envVars.JWT_ACCESS_EXPIRES_IN as string,
    refreshSecret: (envVars.JWT_REFRESH_SECRET as string) || `${envVars.JWT_SECRET}_refresh`,
    refreshExpiresIn: envVars.JWT_REFRESH_EXPIRES_IN as string,
    refreshExpiresDays: envVars.REFRESH_EXPIRES_DAYS as number,
  },
  clientUrl: envVars.CLIENT_URL as string,
};

export default config;
