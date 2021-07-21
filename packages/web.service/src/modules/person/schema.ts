import { model, Schema } from 'mongoose';

export type Person = {
  readonly quantity: number;
};

export const schema = new Schema<Person>({
  quantity: { type: Number, required: true },
});

export const PersonModel = model<Person>('Person', schema);
