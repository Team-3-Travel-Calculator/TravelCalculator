import { model, Schema } from 'mongoose';

import { discriminatorKey } from '../guidePrice';
import { GuideGroupSizes, GuideTypes } from '../guideTypes';

// TODO: add correct imports of ComfortLevels & SeasonTypes

const ComfortLevels = {};

const SeasonTypes = {};

const GuideSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    workDate: { type: Date, required: true },
    seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
    comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
    guidesList: [
      {
        type: { type: Number, enum: Object.values(GuideTypes), required: true },
        groupSize: {
          type: Number,
          enum: Object.values(GuideGroupSizes).map((size) => size.code),
          required: true,
        },
        name: { type: String, required: true },
      },
    ],
    totalPrice: { type: String, required: true },
  },
  discriminatorKey
);
export const GuideModel = model('Guide', GuideSchema);

const GuideTourSchema = new Schema(
  {
    guidesList: [
      {
        workHours: { type: String, required: true },
      },
    ],
  },
  discriminatorKey
);

export const GuideTourModel = GuideModel.discriminator(GuideTypes.Tour, GuideTourSchema);
