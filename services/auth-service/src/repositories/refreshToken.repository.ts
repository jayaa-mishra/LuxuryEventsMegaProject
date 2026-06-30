import RefreshToken, { IRefreshToken } from '../models/refreshToken.model';

/**
 * Stores only hashes of refresh tokens. Lookups are by hash so the raw token
 * never touches the database.
 */
export class RefreshTokenRepository {
  async create(userId: string, tokenHash: string, expiresAt: Date): Promise<IRefreshToken> {
    return RefreshToken.create({ user: userId, tokenHash, expiresAt });
  }

  async findActiveByHash(tokenHash: string): Promise<IRefreshToken | null> {
    return RefreshToken.findOne({ tokenHash, revokedAt: { $exists: false } });
  }

  async revoke(id: string): Promise<void> {
    await RefreshToken.findByIdAndUpdate(id, { revokedAt: new Date() });
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await RefreshToken.updateMany(
      { user: userId, revokedAt: { $exists: false } },
      { revokedAt: new Date() },
    );
  }
}

export const refreshTokenRepository = new RefreshTokenRepository();
export default refreshTokenRepository;
