import { model, Schema } from 'mongoose';

import type { Location } from '../location';

// TODO: add Client schema
type Client = {
  readonly client: string;
};

// TODO: add PersonTypes enum
enum PersonTypes {}

// TODO: add SeasonTypes enum
enum SeasonTypes {}

export type Visitors = {
  readonly personType: PersonTypes;
  readonly count: number;
};

export type Visit = {
  readonly client: Client;
  readonly attendanceDate: Date;
  readonly orderedLocations: readonly Location[];
  readonly totalHours: string;
  readonly visitors: readonly Visitors[];
  readonly orderedSeason: SeasonTypes;
};

const schema = new Schema<Visit>({
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
});

export const VisitModel = model<Visit>('Visit', schema);
