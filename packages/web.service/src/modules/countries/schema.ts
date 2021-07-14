import { model, Schema } from 'mongoose';

export type Countries = {
  readonly name: string;
};

export const schema = new Schema<Countries>({
  name: { type: String, required: true },
});

export const CountriesModel = model<Countries>('Countries', schema);
