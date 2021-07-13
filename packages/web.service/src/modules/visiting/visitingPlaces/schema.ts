import { model, Schema } from 'mongoose';

type VisitingPlaces = {
  readonly title: string;
  readonly hoursNumber: number;
  readonly version: number;
};

const schema = new Schema<VisitingPlaces>({
  title: { type: String, required: true },
  hoursNumber: { type: Number, required: true },
  version: { type: Number, required: true },
});

export const VisitingPlacesModel = model<VisitingPlaces>('VisitingPlaces', schema);
