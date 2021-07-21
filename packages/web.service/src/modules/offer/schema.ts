import { model, Schema } from 'mongoose';

import type { TourProgram } from '../tourProgram';

// TODO: add Client schema
type Client = {
  readonly client: string;
};

// TODO: add RawPrice type
type RawPrice = {
  readonly price: string;
};

export type Offer = {
  readonly orderId: number;
  readonly client: Client;
  readonly calculationDate: string;
  readonly offerAuthor: string;
  readonly tourProgram: TourProgram;
  readonly tourInclusions: string;
  readonly personsNumber: number;
  readonly totalPrice: RawPrice;
  readonly conditions: string;
};

const schema = new Schema<Offer>({
  orderId: { type: Number, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  calculationDate: { type: String, required: true },
  offerAuthor: { type: String, required: true },
  tourProgram: { type: Schema.Types.ObjectId, ref: 'TourProgram', required: true },
  tourInclusions: { type: String, required: true },
  personsNumber: { type: Number, required: true },
  totalPrice: { type: String, required: true },
  conditions: { type: String, required: true },
});

export const OfferModel = model<Offer>('Offer', schema);
