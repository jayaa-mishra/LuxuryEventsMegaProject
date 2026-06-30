import { describe, it, expect } from 'vitest';
import { SuccessCodes, ClientErrorCodes, ServerErrorCodes, StatusCodes } from './error-codes';

describe('error-codes', () => {
  it('exposes the common HTTP codes', () => {
    expect(SuccessCodes.OK).toBe(200);
    expect(SuccessCodes.CREATED).toBe(201);
    expect(ClientErrorCodes.BAD_REQUEST).toBe(400);
    expect(ClientErrorCodes.NOT_FOUND).toBe(404);
    expect(ClientErrorCodes.CONFLICT).toBe(409);
    expect(ServerErrorCodes.INTERNAL_SERVER_ERROR).toBe(500);
  });

  it('merges all groups into StatusCodes', () => {
    expect(StatusCodes.CREATED).toBe(201);
    expect(StatusCodes.NOT_FOUND).toBe(404);
    expect(StatusCodes.SERVICE_UNAVAILABLE).toBe(503);
  });

  it('freezes the code maps', () => {
    expect(Object.isFrozen(SuccessCodes)).toBe(true);
    expect(Object.isFrozen(ClientErrorCodes)).toBe(true);
  });
});
