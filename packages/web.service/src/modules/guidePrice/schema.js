import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { GuideGroupSizes, GuideTypes, WorkTermTypes } from '../guideTypes';
import { SeasonTypes } from '../season';

const GuidePriceSchema = new Schema({
  guideType: { type: Number, enum: Object.values(GuideTypes), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  groupSize: {
    type: Number,
    enum: Object.values(GuideGroupSizes).map((size) => size.code),
    required: true,
  },
  workTermType: {
    type: Number,
    enum: Object.values(WorkTermTypes).map((type) => type.code),
    required: true,
  },
  price: { type: String, required: true },
});

export const GuidePriceModel = model('GuidePrice', GuidePriceSchema);
