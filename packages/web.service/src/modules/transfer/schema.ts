import { model, Schema } from 'mongoose';

import type { Client } from '../client';
import { ComfortLevels } from '../comfortLevel';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import type { TransportTypeCount } from '../transferTransportTypeNumber';
import { TransportTypes } from '../transportType';

export type Transfer = {
  readonly client: Client;
  readonly transferDate: Date;
  readonly comfortLevel: ComfortLevels;
  readonly seasonType: SeasonTypes;
  readonly personsNumber: PersonsNumbers;
  readonly transportTypeCount: TransportTypeCount;
};

const schema = new Schema<Transfer>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  transferDate: { type: Date, required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  transportTypeCount: {
    type: { type: Number, enum: Object.values(TransportTypes), required: true },
    number: { type: Number, required: true },
  },
});

export const TransferModel = model<Transfer>('Transfer', schema);
