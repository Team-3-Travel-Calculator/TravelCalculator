import { model, Schema } from 'mongoose';

import type { Locations } from '../locations';

//  Just for code working, it would be import to PersonType schema
type PersonType = {
  readonly personType: string;
};

//  Just for code working, it would be import to Seasons schema
type Seasons = {
  readonly season: string;
};

export type VisitPrice = {
  readonly location: Locations;
  readonly personType: PersonType;
  readonly season: Seasons;
  readonly price: number;
};

export const schema = new Schema<VisitPrice>({
  location: { type: Schema.Types.ObjectId, ref: 'Locations', required: true },
  personType: { type: Schema.Types.ObjectId, ref: 'PersonTypes', required: true },
  season: { type: Schema.Types.ObjectId, ref: 'Seasons', required: true },
  price: { type: Number, required: true },
});

export const VisitPriceModel = model<VisitPrice>('VisitPrice', schema);
