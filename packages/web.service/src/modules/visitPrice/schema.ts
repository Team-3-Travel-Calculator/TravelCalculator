import { model, Schema } from 'mongoose';

import type { Location } from '../location';

//  TODO: add PersonType enum
enum PersonType {}

//  TODO: add Season enum
enum Season {}

export type RawPrice = {
  readonly price: string;
};

export type VisitPrice = {
  readonly visitLocation: Location;
  readonly personType: PersonType;
  readonly season: Season;
  readonly price: RawPrice;
};

const schema = new Schema<VisitPrice>({
  visitLocation: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  personType: { enum: PersonType, required: true },
  season: { enum: Season, required: true },
  price: { type: String, required: true },
});

export const VisitPriceModel = model<VisitPrice>('VisitPrice', schema);
