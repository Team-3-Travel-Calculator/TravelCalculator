import { model, Schema } from 'mongoose';

export enum UserRoles {
  Admin = 1,
  Owner = 2,
  Manager = 3,
}
export type User = {
  readonly email: string;
  readonly password: string;
  readonly role: UserRoles;
  readonly token: string;
};
const schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: Object.values(UserRoles),
    default: UserRoles.Manager,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const UserModel = model<User>('User', schema);
