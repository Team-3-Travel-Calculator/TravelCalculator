import { model, Schema } from 'mongoose';

import { SeasonTypes } from '../season';
import { ServiceTypes } from '../type';

export type TransferPrice = {
  readonly serviceTypes: ServiceTypes;
  readonly personId: number;
  readonly seasonTypes: SeasonTypes;
  readonly transportId: string;
  readonly price: number;
};

export const schema = new Schema<TransferPrice>({
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  personId: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  transportId: { type: Schema.Types.ObjectId, ref: 'Transport', required: true },
  price: { type: Number, required: true },
});

export const TransferPriceModel = model<TransferPrice>('TransferPrice', schema);
