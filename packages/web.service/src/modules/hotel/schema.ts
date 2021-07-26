import { model, Schema } from 'mongoose';

import type { Client } from '../client';
import { ComfortLevels } from '../comfortLevel';
import { HotelTypes } from '../hotelPrice';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';

export type Hotel = {
  readonly client: Client;
  readonly stayDate: Date;
  readonly personsNumber: PersonsNumbers;
  readonly hotelType: HotelTypes;
  readonly seasonType: SeasonTypes;
  readonly comfortLevel: ComfortLevels;
  readonly tripleRoomNumber: number;
  readonly doubleRoomNumber: number;
  readonly singleRoomNumber: number;
};

const schema = new Schema<Hotel>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  stayDate: { type: Date, required: true },
  personsNumber: { type: Number, enum: Object.values(PersonsNumbers), required: true },
  hotelType: { type: Number, enum: Object.values(HotelTypes), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  tripleRoomNumber: { type: Number, required: true },
  doubleRoomNumber: { type: Number, required: true },
  singleRoomNumber: { type: Number, required: true },
});

export const HotelModel = model<Hotel>('Hotel', schema);
