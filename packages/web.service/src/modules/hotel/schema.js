import mongoose from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { HotelTypes, RoomTypes } from '../hotelType';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';

const HotelSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  stayDate: { type: String, required: true },
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  hotelType: { type: Number, enum: Object.values(HotelTypes), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  rooms: [
    {
      type: { type: Number, enum: Object.values(RoomTypes) },
      number: { type: Number },
    },
  ],
  totalPrice: { type: String, required: true },
});

export const HotelModel = mongoose.model('Hotel', HotelSchema);
