import mongoose from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { GuideTypes } from '../guideTypes';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';

const GuideSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  workDate: { type: String, required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  guidesList: [
    {
      type: { type: Number, enum: Object.values(GuideTypes), required: true },
      number: { type: Number, required: true },
      personsNumber: {
        type: Number,
        enum: Object.values(PersonsNumbers),
        required: true,
      },
      workHours: { type: String, default: 'N/M' },
      name: { type: String, required: true },
    },
  ],
  totalPrice: { type: String, required: true },
});
export const GuideModel = mongoose.model('Guide', GuideSchema);
