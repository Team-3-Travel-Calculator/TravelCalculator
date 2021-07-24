import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import { TransportTypes } from '../transportType';

export type TransportTypeCount = {
  readonly type: TransportTypes;
  readonly number: number;
};

export type TransferTransportTypeNumber = {
  readonly personsNumber: PersonsNumbers;
  readonly seasonType: SeasonTypes;
  readonly comfortLevel: ComfortLevels;
  readonly transportTypeCount: readonly TransportTypeCount[];
};

const schema = new Schema<TransferTransportTypeNumber>({
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  transportTypeCount: [
    {
      type: { type: Number, enum: Object.values(TransportTypes), required: true },
      number: { type: Number, required: true },
    },
  ],
});

export const TransferTransportTypeNumberModel = model<TransferTransportTypeNumber>(
  'TransferTransportTypeNumber',
  schema
);
