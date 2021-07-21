import { model, Schema } from 'mongoose';

import { SeasonTypes } from '../season';
import { TransportClasses } from '../transportType';
import { ServiceTypes } from '../type';

export type Transport = {
  readonly transportTypes: TransportClasses;
  readonly transportQnt: number;
};

export type TransferPersonQnt = {
  readonly personQnt: number;
  readonly seasonTypes: number;
  readonly serviceTypes: ServiceTypes;
  readonly transport: readonly Transport[];
};

export const schema = new Schema<TransferPersonQnt>({
  personQnt: { type: Number, required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  transport: [
    {
      transportTypes: { type: Number, enum: Object.values(TransportClasses), required: true },
      transportQnt: { type: Number, required: true },
    },
  ],
});

export const TransferPersonQntModel = model<TransferPersonQnt>('TransferPersonQnt', schema);
