import { compare } from 'bcrypt';
import { nanoid } from 'nanoid';

import { getUserByEmailAction } from '../user';
import { IncorrectPasswordError, UserNotFoundError } from './errors';

export const loginUserAction = async (email, password) => {
  const maybeUser = await getUserByEmailAction(email);
  if (!maybeUser) {
    return Promise.reject(new UserNotFoundError(`User with email '${email}' does not exists`));
  }

  const didPasswordMatch = await compare(password, maybeUser.password);
  if (!didPasswordMatch) {
    return Promise.reject(new IncorrectPasswordError('Password does not match'));
  }

  const newToken = nanoid();
  await maybeUser.updateOne({ token: newToken });

  return newToken;
};
