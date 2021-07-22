import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

export enum UserRoles {
  Owner = 8,
  Admin = 4,
  Manager = 2,
}

export type User = {
  readonly email: string;
  readonly password: string;
  readonly role: UserRoles;
  readonly token?: string;
};

export type UserDocument = Document & User;

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
    required: true,
  },
  token: {
    type: String,
  },
});

export const UserModel = model<User>('User', schema);
