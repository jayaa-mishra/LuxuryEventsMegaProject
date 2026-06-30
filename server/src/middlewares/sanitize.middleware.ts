import { Request, Response, NextFunction } from 'express';

/**
 * Lightweight NoSQL-injection guard.
 *
 * Recursively strips keys that start with `$` or contain `.` from `req.body`,
 * which is how Mongo query operators ($gt, $where, dotted paths) sneak in.
 *
 * Unlike `express-mongo-sanitize`, this only touches `req.body` — Express 5
 * makes `req.query`/`req.params` read-only getters, so mutating them throws.
 */
const scrub = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(scrub);
  if (value && typeof value === 'object') {
    const clean: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (key.startsWith('$') || key.includes('.')) continue;
      clean[key] = scrub(val);
    }
    return clean;
  }
  return value;
};

export const sanitizeBody = (req: Request, _res: Response, next: NextFunction): void => {
  // Skip Buffers (e.g. the raw-parsed webhook body) — scrubbing them would corrupt the bytes.
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    req.body = scrub(req.body) as Record<string, unknown>;
  }
  next();
};
