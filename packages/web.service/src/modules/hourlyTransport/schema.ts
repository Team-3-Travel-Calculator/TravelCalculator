import { model, Schema } from 'mongoose';

import type { Client } from '../client';
import { ComfortLevels } from '../comfortLevel';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';

// TODO: add TransportTypes enum
enum TransportTypes {}

export type HourlyTransportTypeCount = {
  readonly type: TransportTypes;
  readonly number: number;
  readonly workHoursNumber: string;
};

export type HourlyTransport = {
  readonly client: Client;
  readonly workDate: Date;
  readonly comfortLevel: ComfortLevels;
  readonly seasonType: SeasonTypes;
  readonly personsNumber: PersonsNumbers;
  readonly transportTypeCount: HourlyTransportTypeCount;
};

const schema = new Schema<HourlyTransport>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  workDate: { type: Date, required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  transportTypeCount: {
    type: { type: Number, enum: Object.values(TransportTypes), required: true },
    number: { type: Number, required: true },
    workHoursNumber: { type: String, required: true },
  },
});

export const HourlyTransportModel = model<HourlyTransport>('HourlyTransport', schema);
