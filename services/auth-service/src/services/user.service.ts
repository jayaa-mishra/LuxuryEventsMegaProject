import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from '../models/user.model';
import { userRepository, UserRepository } from '../repositories/user.repository';
import { refreshTokenRepository, RefreshTokenRepository } from '../repositories/refreshToken.repository';
import { AppError } from '../utils/apiError';
import config from '../config/serverConfig';

export interface AuthPayload {
  user: Partial<IUser>;
  accessToken: string;
  refreshToken: string;
}

/**
 * Identity business logic: registration, sign-in, and access/refresh token
 * lifecycle (issue → rotate → revoke).
 *
 * - Access tokens are short-lived JWTs signed with JWT_SECRET (so the main API
 *   can verify them without calling back here).
 * - Refresh tokens are opaque random strings; only their SHA-256 hash is stored,
 *   and each use rotates (old revoked, new issued).
 */
export class UserService {
  constructor(
    private readonly users: UserRepository = userRepository,
    private readonly refreshTokens: RefreshTokenRepository = refreshTokenRepository,
  ) {}

  createAccessToken(payload: { id: string; role: string }): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.accessExpiresIn,
    } as SignOptions);
  }

  verifyToken(token: string): { id: string; role: string } {
    return jwt.verify(token, config.jwt.secret) as { id: string; role: string };
  }

  private hashRefreshToken(raw: string): string {
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  private async issueRefreshToken(userId: string): Promise<string> {
    const raw = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date(Date.now() + config.jwt.refreshExpiresDays * 24 * 60 * 60 * 1000);
    await this.refreshTokens.create(userId, this.hashRefreshToken(raw), expiresAt);
    return raw;
  }

  private sanitize(user: IUser): Partial<IUser> {
    const obj = user.toObject();
    delete obj.password;
    return obj;
  }

  private async buildAuthPayload(user: IUser): Promise<AuthPayload> {
    const userId = String(user._id);
    const accessToken = this.createAccessToken({ id: userId, role: user.role });
    const refreshToken = await this.issueRefreshToken(userId);
    return { user: this.sanitize(user), accessToken, refreshToken };
  }

  async register(data: Partial<IUser>): Promise<AuthPayload> {
    const exists = await this.users.getByEmail(data.email as string);
    if (exists) throw AppError.conflict('User already exists with this email');

    const user = await this.users.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      company: data.company,
      role: data.role || 'client',
    });

    return this.buildAuthPayload(user);
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.users.getByEmailWithPassword(email);
    if (!user || !(await user.matchPassword(password))) {
      throw AppError.unauthorized('Invalid email or password');
    }
    return this.buildAuthPayload(user);
  }

  /** Rotate a refresh token: validate → revoke old → issue a new pair. */
  async refresh(rawToken: string): Promise<AuthPayload> {
    if (!rawToken) throw AppError.unauthorized('No refresh token provided');

    const stored = await this.refreshTokens.findActiveByHash(this.hashRefreshToken(rawToken));
    if (!stored || stored.expiresAt.getTime() < Date.now()) {
      throw AppError.unauthorized('Refresh token is invalid or expired');
    }

    await this.refreshTokens.revoke(String(stored._id));

    const user = await this.users.getById(String(stored.user));
    if (!user) throw AppError.unauthorized('User for this token no longer exists');

    return this.buildAuthPayload(user);
  }

  async revokeRefreshToken(rawToken?: string): Promise<void> {
    if (!rawToken) return;
    const stored = await this.refreshTokens.findActiveByHash(this.hashRefreshToken(rawToken));
    if (stored) await this.refreshTokens.revoke(String(stored._id));
  }

  /** Used by the gateway / other services to validate a bearer access token. */
  async authenticate(token: string): Promise<Partial<IUser>> {
    const decoded = this.verifyToken(token);
    const user = await this.users.getById(decoded.id);
    if (!user) throw AppError.unauthorized('User for this token no longer exists');
    return this.sanitize(user);
  }

  async getProfile(id: string): Promise<Partial<IUser>> {
    const user = await this.users.getById(id);
    if (!user) throw AppError.notFound('User not found');
    return this.sanitize(user);
  }

  async listUsers(): Promise<Partial<IUser>[]> {
    const users = await this.users.getAll();
    return users.map((u) => this.sanitize(u));
  }
}

export const userService = new UserService();
export default userService;
