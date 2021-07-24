import { model, Schema } from 'mongoose';

import type { Client } from '../client';
import { ComfortLevels } from '../comfortLevel';
import type { PriceRaw } from '../price';
import { SeasonTypes } from '../season';

export enum GuideGroupSizes {
  Small = 5,
  Medium = 15,
  Large = 50,
}

export enum GuideTypes {
  Transfer = 1,
  Tour = 2,
  Instructor = 3,
  SkiInstructor = 4,
}

export type GuideTransfer = {
  readonly type: GuideTypes.Transfer;
};

export type GuideTour = {
  readonly type: GuideTypes.Tour;
  readonly workHours: string;
};

export type GuideInstructor = {
  readonly type: GuideTypes.Instructor;
};

export type GuideSkiInstructor = {
  readonly type: GuideTypes.SkiInstructor;
};

export type GuideType = GuideInstructor | GuideSkiInstructor | GuideTour | GuideTransfer;

export type Guide = {
  readonly client: Client;
  readonly workDate: Date;
  readonly guideType: GuideType;
  readonly season: SeasonTypes;
  readonly comfortLevel: ComfortLevels;
  readonly guideGroupSize: GuideGroupSizes;
  readonly totalWorkHours: string;
  readonly price: PriceRaw;
};

const schema = new Schema<Guide>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  workDate: { type: Date, required: true },
  guideType: { type: Number, enum: Object.values(GuideTypes), required: true },
  season: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  groupSize: { type: Number, enum: Object.values(GuideGroupSizes), required: true },
  totalWorkHours: { type: String, required: true },
  price: { type: String, required: true },
});

export const GuideModel = model<Guide>('Guide', schema);
