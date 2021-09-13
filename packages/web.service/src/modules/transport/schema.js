import mongoose from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import { TransportCalculationTypes, TransportTypes } from '../transportType';

const TransportSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  transportationDate: { type: String, required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  transportType: { type: Number, enum: Object.values(TransportTypes), required: true },
  transportTypeNumber: { type: Number, required: true },
  calculationType: {
    type: Number,
    enum: Object.values(TransportCalculationTypes),
    required: true,
  },
  ridesCount: { type: Number, default: 1 },
  workHours: { type: String, default: 'N/M' },
  totalPrice: { type: String, required: true },
});
export const TransportModel = mongoose.model('Transport', TransportSchema);
