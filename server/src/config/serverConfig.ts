/**
 * Flat config re-export, kept to mirror the reference project's
 * `config/serverConfig.js`. Prefer importing the structured `env` object;
 * this exists so the folder structure matches the AirlineManagementProject
 * and for ergonomic destructuring (`const { PORT } = require(...)`).
 */
import { env } from './env';

export const PORT = env.port;
export const NODE_ENV = env.env;
export const JWT_KEY = env.jwt.secret;
export const JWT_EXPIRES_IN = env.jwt.expiresIn;
export const MONGO_URI = env.mongoose.url;
export const CLIENT_URL = env.clientUrl;

export default env;
