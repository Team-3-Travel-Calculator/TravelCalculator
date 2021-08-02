import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { SeasonTypes } from '../season';
import { TransportCalculationTypes, TransportTypes } from '../transportType';

const TransportPriceSchema = new Schema({
  calculationType: { type: Number, enum: Object.values(TransportCalculationTypes), required: true },
  transportType: { type: Number, enum: Object.values(TransportTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  price: { type: String, required: true },
});

export const TransportPriceModel = model('TransportPrice', TransportPriceSchema);
