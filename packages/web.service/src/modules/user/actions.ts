import { genSaltSync, hash } from 'bcrypt';

import { EmailAlreadyExistsError } from './errors';
import type { UserDocument } from './schema';
import { UserModel, UserRoles } from './schema';

const salt = genSaltSync();

export const logoutUserAction = async (id: string): Promise<UserDocument | null> =>
  UserModel.findByIdAndUpdate(id, { $unset: { token: 1 } }, { new: true });

export const getUserByEmailAction = async (email: string): Promise<UserDocument | null> =>
  UserModel.findOne({ email });

export const getUserByTokenAction = async (token: string): Promise<UserDocument | null> =>
  UserModel.findOne({ token });

export const createUserAction = async (
  email: string,
  password: string,
  role: UserRoles
): Promise<UserDocument> => {
  if (await getUserByEmailAction(email)) {
    return Promise.reject(new EmailAlreadyExistsError());
  }

  return UserModel.create({ email, role, password: await hash(password, salt) });
};

export const getAllUsersAction = async (
  page: number,
  size: number
): Promise<readonly UserDocument[]> =>
  UserModel.find()
    .limit(size)
    .skip(size * page);

export const getOrCreateOwnerAction = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  const owner = await UserModel.findOne({ role: UserRoles.Owner });
  return owner ?? createUserAction(email, password, UserRoles.Owner);
};
