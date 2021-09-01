import mongoose from 'mongoose';

import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';

const VisitPriceSchema = new mongoose.Schema({
  visitLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  personType: { type: Number, enum: Object.values(PersonTypes), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  price: { type: String, required: true },
});

export const VisitPriceModel = mongoose.model('VisitPrice', VisitPriceSchema);
