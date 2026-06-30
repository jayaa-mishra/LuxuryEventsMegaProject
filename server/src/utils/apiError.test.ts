import { describe, it, expect } from 'vitest';
import { AppError } from './apiError';

describe('AppError', () => {
  it('is an operational Error subclass', () => {
    const err = AppError.notFound('missing');
    expect(err).toBeInstanceOf(Error);
    expect(err.isOperational).toBe(true);
    expect(err.message).toBe('missing');
  });

  it('maps each factory to the right status code', () => {
    expect(AppError.badRequest().statusCode).toBe(400);
    expect(AppError.unauthorized().statusCode).toBe(401);
    expect(AppError.forbidden().statusCode).toBe(403);
    expect(AppError.notFound().statusCode).toBe(404);
    expect(AppError.conflict().statusCode).toBe(409);
    expect(AppError.internal().statusCode).toBe(500);
  });

  it('carries optional details', () => {
    const err = AppError.badRequest('bad', ['field is required']);
    expect(err.details).toEqual(['field is required']);
  });
});
