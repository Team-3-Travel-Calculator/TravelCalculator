import { model, Schema } from 'mongoose';

import type { Location } from '../location';

// TODO: add Client schema
type Client = {
  readonly client: string;
};

// TODO: add PersonType enum
enum PersonType {}

// TODO: add Season enum
enum Season {}

export type Visitors = {
  readonly personType: PersonType;
  readonly count: number;
};

export type Visit = {
  readonly client: Client;
  readonly attendanceDate: Date;
  readonly orderedLocations: readonly Location[];
  readonly totalHours: string;
  readonly visitors: readonly Visitors[];
  readonly orderedSeason: Season;
};

const schema = new Schema<Visit>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  attendanceDate: { type: Date, required: true },
  orderedLocations: [{ type: Schema.Types.ObjectId, ref: 'Location', required: true }],
  totalHours: { type: String, required: true },
  visitors: [
    {
      personType: { enum: PersonType, required: true },
      count: { type: Number, required: true },
    },
  ],
  orderedSeason: { enum: Season, required: true },
});

export const VisitModel = model<Visit>('Visit', schema);
