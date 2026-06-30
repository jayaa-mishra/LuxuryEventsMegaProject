export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational = true;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message = 'Bad request') { return new AppError(message, 400); }
  static unauthorized(message = 'Not authorized') { return new AppError(message, 401); }
  static forbidden(message = 'Forbidden') { return new AppError(message, 403); }
  static notFound(message = 'Not found') { return new AppError(message, 404); }
  static conflict(message = 'Already exists') { return new AppError(message, 409); }
}
