import { model, Schema } from 'mongoose';

import type { GroupSize } from '../groupSize';
import type { GuideType } from '../guideType';

// Just for code working, it would be schema for Seasons
type Seasons = {
  readonly season: string;
};

// Just for code working, it would be schema for Level
type Level = {
  readonly comfortLevel: string;
};

export type Guides = {
  readonly guideType: GuideType;
  readonly season: Seasons;
  readonly comfortLevel: Level;
  readonly groupSize: GroupSize;
  readonly totalWorkHours: number;
  readonly price: number;
};

export const schema = new Schema<Guides>({
  guideType: { type: Schema.Types.ObjectId, ref: 'GuideType', required: true },
  season: { type: Schema.Types.ObjectId, ref: 'Seasons', required: true },
  comfortLevel: { type: Schema.Types.ObjectId, ref: 'Level', required: true },
  groupSize: { type: Schema.Types.ObjectId, ref: 'GroupSize', required: true },
  totalWorkHours: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const GuidesModel = model<Guides>('Guides', schema);
