import { model, Schema } from 'mongoose';

import { SeasonTypes } from '../season';
import { TransportClasses } from '../transportType';
import { ServiceTypes } from '../type';

export type Transport = {
  readonly transportTypes: TransportClasses;
  readonly transportTypeQnt: number;
  readonly transportHourlyPrice: number;
};

export type TransportHourlyTotalPrice = {
  readonly serviceTypes: ServiceTypes;
  readonly seasonTypes: SeasonTypes;
  readonly transport: readonly Transport[];
  readonly totalHours: number;
  readonly totalPrice: number;
};

export const schema = new Schema<TransportHourlyTotalPrice>({
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  transport: [
    {
      transportTypes: { type: Number, enum: Object.values(TransportClasses), required: true },
      transportQnt: {
        type: Schema.Types.ObjectId,
        ref: 'TransportHourlyPersonQnt',
        required: true,
      },
      transportHourlyPrice: {
        type: Schema.Types.ObjectId,
        ref: 'TransportHourlyPrice',
        required: true,
      },
    },
  ],
  totalHours: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export const TransportHourlyTotalPriceModel = model<TransportHourlyTotalPrice>(
  'TransportHourlyTotalPrice',
  schema
);
