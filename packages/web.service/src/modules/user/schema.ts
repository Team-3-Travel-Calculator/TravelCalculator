import mongoose, { Schema } from 'mongoose';

enum UserRoles {
  Admin = 1,
  Owner = 2,
  Manager = 3,
}
type User = {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly role: UserRoles;
  readonly token: string;
};
const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

export const UserModel = mongoose.model<User>('User', UserSchema);
