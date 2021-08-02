import { model, Schema } from 'mongoose';

import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';

const VisitSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  attendanceDate: { type: Date, required: true },
  orderedLocations: [{ type: Schema.Types.ObjectId, ref: 'Location', required: true }],
  totalHours: { type: String, required: true },
  visitors: [
    {
      personType: { type: Number, enum: Object.values(PersonTypes), required: true },
      count: { type: Number, required: true },
    },
  ],
  orderedSeason: { type: Number, enum: Object.values(SeasonTypes), required: true },
  totalPrice: { type: String, required: true },
});

export const VisitModel = model('Visit', VisitSchema);
