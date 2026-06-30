import { describe, it, expect, vi } from 'vitest';
import { sanitizeBody } from './sanitize.middleware';

const run = (body: any) => {
  const req: any = { body };
  const next = vi.fn();
  sanitizeBody(req, {} as any, next);
  expect(next).toHaveBeenCalledOnce();
  return req.body;
};

describe('sanitizeBody', () => {
  it('strips Mongo operator ($-prefixed) keys', () => {
    expect(run({ name: 'a', $gt: '' })).toEqual({ name: 'a' });
  });

  it('strips dotted keys', () => {
    expect(run({ 'a.b': 1, ok: 2 })).toEqual({ ok: 2 });
  });

  it('recurses into nested objects and arrays', () => {
    expect(run({ a: { $where: 'x', b: 1 }, list: [{ $ne: null, c: 2 }] })).toEqual({
      a: { b: 1 },
      list: [{ c: 2 }],
    });
  });

  it('leaves Buffers untouched (e.g. raw webhook bodies)', () => {
    const out = run(Buffer.from('hello'));
    expect(Buffer.isBuffer(out)).toBe(true);
    expect(out.toString()).toBe('hello');
  });

  it('is a no-op when there is no body', () => {
    const req: any = {};
    const next = vi.fn();
    sanitizeBody(req, {} as any, next);
    expect(next).toHaveBeenCalledOnce();
  });
});
