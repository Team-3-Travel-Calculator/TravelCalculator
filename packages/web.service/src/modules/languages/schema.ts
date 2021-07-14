import { model, Schema } from 'mongoose';

export type Languages = {
  readonly name: string;
};

export const schema = new Schema<Languages>({
  name: { type: String, required: true },
});

export const LanguagesModel = model<Languages>('Languages', schema);
