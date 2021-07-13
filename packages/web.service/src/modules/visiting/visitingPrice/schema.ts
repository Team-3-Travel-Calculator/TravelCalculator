import type { ObjectID } from 'mongodb';
import { model, Schema } from 'mongoose';

type VisitingPrice = {
  readonly place: ObjectID;
  readonly personType: ObjectID;
  readonly season: ObjectID;
  readonly price: number;
  readonly version: number;
};

const schema = new Schema<VisitingPrice>({
  place: { type: Schema.Types.ObjectId, ref: 'VisitingPlaces', required: true },
  personType: { type: Schema.Types.ObjectId, ref: 'PersonTypes', required: true },
  season: { type: Schema.Types.ObjectId, ref: 'Seasons', required: true },
  price: { type: Number, required: true },
  version: { type: Number, required: true },
});

export const VisitingPriceModel = model<VisitingPrice>('VisitingPrice', schema);
