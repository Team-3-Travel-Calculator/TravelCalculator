import { model, Schema } from 'mongoose';

import { HotelTypes, RoomTypes } from '../hotelType';

// TODO: add correct imports for ComfortLevels & SeasonTypes
const SeasonTypes = {};

const ComfortLevels = {};

const HotelPriceSchema = new Schema({
  hotelType: { type: Number, enum: Object.values(HotelTypes), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  roomType: { type: Number, enum: Object.values(RoomTypes), required: true },
  price: { type: String, required: true },
});

export const HotelPriceModel = model('HotelPrice', HotelPriceSchema);
