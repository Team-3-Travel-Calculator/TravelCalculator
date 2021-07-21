import { model, Schema } from 'mongoose';

import type { Location } from '../location';
import type { PriceRaw } from '../price';

//  TODO: add PersonTypes enum
enum PersonTypes {}

//  TODO: add SeasonTypes enum
enum SeasonTypes {}

export type VisitPrice = {
  readonly visitLocation: Location;
  readonly personType: PersonTypes;
  readonly season: SeasonTypes;
  readonly price: PriceRaw;
};

const schema = new Schema<VisitPrice>({
  visitLocation: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  personType: { type: Number, enum: Object.values(PersonTypes), required: true },
  season: { type: Number, enum: Object.values(SeasonTypes), required: true },
  price: { type: String, required: true },
});

export const VisitPriceModel = model<VisitPrice>('VisitPrice', schema);
