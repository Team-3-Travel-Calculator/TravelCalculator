import { model, Schema } from 'mongoose';

export type Locations = {
  readonly location: string;
  readonly hours: number;
};

export const schema = new Schema<Locations>({
  location: { type: String, required: true },
  hours: { type: Number, required: true },
});

export const LocationsModel = model<Locations>('Locations', schema);
