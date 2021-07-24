import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import type { PriceRaw } from '../price';
import { SeasonTypes } from '../season';
import { TransportTypes } from '../transportType';

export type TransferPrice = {
  readonly transportType: TransportTypes;
  readonly comfortLevel: ComfortLevels;
  readonly seasonType: SeasonTypes;
  readonly price: PriceRaw;
};

const schema = new Schema<TransferPrice>({
  transportType: { type: Number, enum: Object.values(TransportTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  price: { type: String, required: true },
});

export const TransferPriceModel = model<TransferPrice>('TransferPrice', schema);
