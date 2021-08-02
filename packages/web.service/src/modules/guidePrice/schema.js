import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { GuideGroupSizes, GuideTypes } from '../guideTypes';
import { SeasonTypes } from '../season';

export const discriminatorKey = {
  discriminatorKey: 'guideType',
};

const GuidePriceSchema = new Schema(
  {
    guideType: { type: Number, enum: Object.values(GuideTypes), required: true },
    seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    groupSize: {
      type: Number,
      enum: Object.values(GuideGroupSizes).map((size) => size.code),
      required: true,
    },
    price: { type: String, required: true },
  },
  discriminatorKey
);
export const GuidePriceModel = model('GuidePrice', GuidePriceSchema);

const GuideTourPriceSchema = new Schema(
  {
    workHours: { type: String, required: true },
  },
  discriminatorKey
);

export const GuideTourPriceModel = GuidePriceModel.discriminator(
  GuideTypes.Tour,
  GuideTourPriceSchema
);
