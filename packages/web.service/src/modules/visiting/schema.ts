import type { ObjectID } from 'mongodb';
import { model, Schema } from 'mongoose';

type VisitorsList = {
  readonly personType: ObjectID;
  readonly count: number;
};

type Visiting = {
  readonly client: ObjectID;
  readonly date: Date;
  readonly orderedPlaces: readonly ObjectID[];
  readonly totalHoursNumber: number;
  readonly visitorsList: readonly VisitorsList[];
  readonly orderedSeason: ObjectID;
  readonly totalPrice: number;
};

const schema = new Schema<Visiting>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, required: true },
  orderedPlaces: [{ type: Schema.Types.ObjectId, ref: 'VisitingPlaces', required: true }],
  totalHoursNumber: { type: Number, required: true },
  visitorsList: [
    {
      personType: { type: Schema.Types.ObjectId, ref: 'PersonTypes', required: true },
      count: { type: Number, required: true },
    },
  ],
  orderedSeason: { type: Schema.Types.ObjectId, ref: 'Seasons', required: true },
  totalPrice: { type: Number, required: true },
});

export const VisitingModel = model<Visiting>('Visiting', schema);
