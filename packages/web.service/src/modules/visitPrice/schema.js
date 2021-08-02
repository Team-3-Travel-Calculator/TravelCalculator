import { model, Schema } from 'mongoose';

// TODO: add correct imports with PersonTypes & SeasonTypes
const PersonTypes = {};
const SeasonTypes = {};

const VisitPriceSchema = new Schema({
  visitLocation: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  personType: { type: Number, enum: Object.values(PersonTypes), required: true },
  season: { type: Number, enum: Object.values(SeasonTypes), required: true },
  price: { type: String, required: true },
});

export const VisitPriceModel = model('VisitPrice', VisitPriceSchema);
