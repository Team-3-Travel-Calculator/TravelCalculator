import { model, Schema } from 'mongoose';

import { SeasonTypes } from '../season';
import { ServiceTypes } from '../type';

export type Transfer = {
  readonly serviceTypes: ServiceTypes;
  readonly personId: number;
  readonly seasonTypes: number;
  readonly transportId: string;
};

export const schema = new Schema<Transfer>({
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  personId: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  transportId: { type: Schema.Types.ObjectId, ref: 'Transport', required: true },
});

export const TransferModel = model<Transfer>('Transfer', schema);
