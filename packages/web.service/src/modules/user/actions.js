import { genSaltSync, hash } from 'bcrypt';

import { EmailAlreadyExistsError } from './errors';
import { UserModel, UserRoles } from './schema';

const salt = genSaltSync();

export const logoutUserAction = (id) =>
  UserModel.findByIdAndUpdate(id, { $unset: { token: 1 } }, { new: true });

export const getUserByEmailAction = (email) => UserModel.findOne({ email });

export const getUserByTokenAction = (token) => UserModel.findOne({ token });

export const createUserAction = async (email, password, role) => {
  if (await getUserByEmailAction(email)) {
    return Promise.reject(new EmailAlreadyExistsError());
  }

  return UserModel.create({ email, role, password: await hash(password, salt) });
};

export const getAllUsersAction = (page, size) =>
  UserModel.find()
    .limit(size)
    .skip(size * page);

export const getOrCreateOwnerAction = async (email, password) => {
  const owner = await UserModel.findOne({ role: UserRoles.Owner });
  return owner ?? createUserAction(email, password, UserRoles.Owner);
};
