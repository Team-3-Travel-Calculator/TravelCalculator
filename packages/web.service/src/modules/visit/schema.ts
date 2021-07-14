import { model, Schema } from 'mongoose';

import type { Locations } from '../locations';

//  Just for code working, it would be import to ClientInfo schema
type ClientInfo = {
  readonly clientInfo: string;
};

//  Just for code working, it would be import to PersonType schema
type PersonType = {
  readonly personType: string;
};

//  Just for code working, it would be import to Seasons schema
type Seasons = {
  readonly season: string;
};

type Visitors = {
  readonly personType: PersonType;
  readonly count: number;
};

type Visit = {
  readonly client: ClientInfo;
  readonly attendanceDate: Date;
  readonly orderedLocations: readonly Locations[];
  readonly totalHours: number;
  readonly visitors: readonly Visitors[];
  readonly orderedSeason: Seasons;
};

const schema = new Schema<Visit>({
  client: { type: Schema.Types.ObjectId, ref: 'ClientInfo', required: true },
  attendanceDate: { type: Date, required: true },
  orderedLocations: [{ type: Schema.Types.ObjectId, ref: 'Locations', required: true }],
  totalHours: { type: Number, required: true },
  visitors: [
    {
      personType: { type: Schema.Types.ObjectId, ref: 'PersonTypes', required: true },
      count: { type: Number, required: true },
    },
  ],
  orderedSeason: { type: Schema.Types.ObjectId, ref: 'Seasons', required: true },
});

export const VisitModel = model<Visit>('Visit', schema);
