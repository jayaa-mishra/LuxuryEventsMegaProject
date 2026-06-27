import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';

export const loginUser = async (email: string, password: string):Promise<{user: IUser, token: string}> => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken((user._id as any).toString());
    return { user, token };
  } else {
    throw new Error('Invalid email or password');
  }
};

export const registerUser = async (data: Partial<IUser>):Promise<IUser> => {
  const userExists = await User.findOne({ email: data.email });

  if (userExists) {
    throw new Error('User already exists');
  }

  return await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || 'client',
  });
};

export const getUserById = async (id: string):Promise<IUser | null> => {
  return await User.findById(id).select('-password');
};
