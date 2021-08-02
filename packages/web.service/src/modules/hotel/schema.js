import { model, Schema } from 'mongoose';

import { HotelTypes } from '../hotelType';

// TODO: add correct imports for ComfortLevels, PersonsNumbers & SeasonTypes
const SeasonTypes = {};

const ComfortLevels = {};

const PersonsNumbers = {};

const HotelSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  stayDate: { type: Date, required: true },
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  hotelType: { type: Number, enum: Object.values(HotelTypes), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  singleRoomNumber: { type: Number, required: true },
  doubleRoomNumber: { type: Number, required: true },
  tripleRoomNumber: { type: Number, required: true },
  totalPrice: { type: String, required: true },
});

export const HotelModel = model('Hotel', HotelSchema);
