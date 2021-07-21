import { genSalt, hash } from 'bcrypt';
import { nanoid } from 'nanoid';

import type { User } from './schema';
import { UserModel, UserRoles } from './schema';

export const ifUserFound = async (email: string): Promise<User | null> =>
  UserModel.findOne({ email });

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return hash(password, salt);
};

export const isNumberRole = (value: number): value is UserRoles =>
  Object.values(UserRoles).includes(value);

export const generateToken = (_token?: string): string => nanoid();

export const createNewUser = async (
  email: string,
  password: string,
  role: number
): Promise<UserModel> =>
  UserModel.create({
    email,
    password: await encryptPassword(password),
    token: generateToken(),
    role,
  });
