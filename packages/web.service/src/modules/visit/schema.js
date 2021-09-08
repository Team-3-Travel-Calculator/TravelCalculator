import mongoose from 'mongoose';

import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';

const VisitSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  attendanceDate: { type: String, required: true },
  totalSpentTime: { type: String, required: true },
  visitors: [
    {
      orderedLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
      personType: { type: Number, enum: Object.values(PersonTypes), required: true },
      count: { type: Number, required: true },
    },
  ],
  orderedSeasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  totalPrice: { type: String, required: true },
});

export const VisitModel = mongoose.model('Visit', VisitSchema);
