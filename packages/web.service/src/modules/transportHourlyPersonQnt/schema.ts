import { model, Schema } from 'mongoose';

import { PersonClasses } from '../personType';
import { SeasonTypes } from '../season';
import { TransportClasses } from '../transportType';
import { ServiceTypes } from '../type';

export type Person = {
  readonly personTypes: PersonClasses;
  readonly personQnt: number;
};

export type Transport = {
  readonly transportTypes: TransportClasses;
  readonly transportQnt: number;
};

export type TransportHourlyPersonQnt = {
  readonly serviceTypes: ServiceTypes;
  readonly seasonTypes: number;
  readonly person: readonly Person[];
  readonly transport: readonly Transport[];
};

export const schema = new Schema<TransportHourlyPersonQnt>({
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
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
});

export const TransportHourlyPersonQntModel = model<TransportHourlyPersonQnt>(
  'TransportHourlyPersonQnt',
  schema
);
