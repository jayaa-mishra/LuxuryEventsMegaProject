/**
 * Centralised HTTP status codes.
 * Mirrors the `utils/error-codes.js` convention from the reference AirlineManagementProject
 * so every layer speaks the same vocabulary instead of sprinkling magic numbers.
 */
export const SuccessCodes = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
});

export const ClientErrorCodes = Object.freeze({
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
});

export const ServerErrorCodes = Object.freeze({
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
});

export const StatusCodes = Object.freeze({
  ...SuccessCodes,
  ...ClientErrorCodes,
  ...ServerErrorCodes,
});
