import { ClientErrorCodes, ServerErrorCodes } from './error-codes';

/**
 * Operational error carrying an HTTP status code.
 *
 * Throw `AppError` from any layer (repository/service/controller) and the
 * global error middleware will translate it into the standard response
 * envelope. `isOperational` distinguishes expected failures (bad input,
 * not found) from unexpected programmer errors.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad request', details?: unknown) {
    return new AppError(message, ClientErrorCodes.BAD_REQUEST, details);
  }

  static unauthorized(message = 'Not authorized') {
    return new AppError(message, ClientErrorCodes.UNAUTHORIZED);
  }

  static forbidden(message = 'Forbidden') {
    return new AppError(message, ClientErrorCodes.FORBIDDEN);
  }

  static notFound(message = 'Resource not found') {
    return new AppError(message, ClientErrorCodes.NOT_FOUND);
  }

  static conflict(message = 'Resource already exists') {
    return new AppError(message, ClientErrorCodes.CONFLICT);
  }

  static internal(message = 'Something went wrong') {
    return new AppError(message, ServerErrorCodes.INTERNAL_SERVER_ERROR);
  }
}
