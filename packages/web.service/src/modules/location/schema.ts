import { model, Schema } from 'mongoose';

export type Location = {
  readonly location: string;
  readonly hoursToVisit: string;
};

const schema = new Schema<Location>({
  location: { type: String, required: true },
  hoursToVisit: { type: String, required: true },
});

export const LocationModel = model<Location>('Location', schema);
