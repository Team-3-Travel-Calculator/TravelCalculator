import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  orderId: { type: Number, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  calculationDate: { type: String, required: true },
  offerAuthor: { type: String, required: true },
  tourPeriod: [{ type: String, required: true }],
  tourProgram: {
    name: { type: String, required: true },
    tour: [
      {
        date: { type: String, required: true },
        meal: { type: Object, required: true },
        hotel: { type: Object, required: true },
        transfer: { type: Object, required: true },
        hourlyTransport: { type: Object, required: true },
        visit: { type: Object, required: true },
        guides: { type: Object, required: true },
      },
    ],
  },
  personsNumber: { type: Number, required: true },
  conditions: { type: String, required: true },
  totalPrice: { type: String, required: true },
});

export const OfferModel = mongoose.model('Offer', OfferSchema);
