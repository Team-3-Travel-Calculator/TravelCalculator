import { model, Schema } from 'mongoose';

// TODO: delete price schema after other schemas merge

const OfferSchema = new Schema({
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

export const OfferModel = model('Offer', OfferSchema);
