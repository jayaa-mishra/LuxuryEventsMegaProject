import User, { IUser } from '../models/user.model';

/**
 * User data-access layer. Mirrors the AuthService `user-repository.js` from the
 * reference project (create / getByEmail / getById).
 */
export class UserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    return User.create(data);
  }

  async getByEmailWithPassword(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+password');
  }

  async getByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async getById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async getAll(): Promise<IUser[]> {
    return User.find().sort({ createdAt: -1 });
  }
}

export const userRepository = new UserRepository();
export default userRepository;
