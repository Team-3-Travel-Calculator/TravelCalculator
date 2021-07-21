import { model, Schema } from 'mongoose';

import { PersonClasses } from '../personType';
import { SeasonTypes } from '../season';
import { TransportClasses } from '../transportType';
import { ServiceTypes } from '../type';

export type Transport = {
  readonly transportTypes: TransportClasses;
  readonly transportQnt: number;
};

export type Person = {
  readonly personTypes: PersonClasses;
  readonly personQnt: number;
};

export type TransferTotal = {
  readonly serviceTypes: ServiceTypes;
  readonly seasonTypes: number;
  readonly totalPrice: number;
  readonly person: readonly Person[];
  readonly transport: readonly Transport[];
};

export const schema = new Schema<TransferTotal>({
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  person: [
    {
      personTypes: { type: Number, enum: Object.values(PersonClasses), required: true },
      personQnt: { type: Number, required: true },
    },
  ],
  transport: [
    {
      transportTypes: { type: Number, enum: Object.values(TransportClasses), required: true },
      transportQnt: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

export const TransferTotalModel = model<TransferTotal>('TransferTotal', schema);
