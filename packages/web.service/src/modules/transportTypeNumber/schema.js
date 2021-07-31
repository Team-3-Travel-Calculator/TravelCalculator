import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import { TransportCalculationTypes, TransportTypes } from '../transportType';

const TransportTypeNumberSchema = new Schema({
  calculationType: { type: Number, enum: Object.values(TransportCalculationTypes), required: true },
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  transportTypeCount: [
    {
      type: { type: Number, enum: Object.values(TransportTypes), required: true },
      number: { type: Number, required: true },
    },
  ],
});

export const TransportTypeNumberModel = model('TransportTypeNumber', TransportTypeNumberSchema);
