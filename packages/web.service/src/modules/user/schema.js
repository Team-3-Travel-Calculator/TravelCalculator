import { model, Schema } from 'mongoose';

export const UserRoles = {
  Owner: 8,
  Admin: 4,
  Manager: 2,
};

const schema = new Schema({
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

export const UserModel = model('User', schema);
