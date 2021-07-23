import { model, Schema } from 'mongoose';

import { ServiceTypes } from '../comfortLevel';
import { SeasonTypes } from '../season';
import { TransportClasses } from '../transportType';

export type TransportHourlyPrice = {
  readonly serviceTypes: ServiceTypes;
  readonly seasonTypes: SeasonTypes;
  readonly transportTypes: TransportClasses;
  readonly totalPrice: number;
};

export const schema = new Schema<TransportHourlyPrice>({
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  transportType: { type: Number, enum: Object.values(TransportClasses), required: true },
  totalPrice: { type: Number, required: true },
});

export const TransportHourlyPriceModel = model<TransportHourlyPrice>(
  'TransportHourlyPrice',
  schema
);
