import { model, Schema } from 'mongoose';

import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';

const VisitPriceSchema = new Schema({
  visitLocation: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  personType: { type: Number, enum: Object.values(PersonTypes), required: true },
  season: { type: Number, enum: Object.values(SeasonTypes), required: true },
  price: { type: String, required: true },
});

export const VisitPriceModel = model('VisitPrice', VisitPriceSchema);
