import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import type { PriceRaw } from '../price';
import { SeasonTypes } from '../season';

export enum HotelTypes {
  ThreeStars = 1,
  FourStars = 2,
  FiveStars = 3,
}

export enum RoomTypes {
  Triple = 1,
  Double = 2,
  Single = 3,
}

export type HotelPrice = {
  readonly hotelType: HotelTypes;
  readonly seasonType: SeasonTypes;
  readonly comfortLevel: ComfortLevels;
  readonly roomType: RoomTypes;
  readonly price: PriceRaw;
};

const schema = new Schema<HotelPrice>({
  hotelType: { type: Number, enum: Object.values(HotelTypes), required: true },
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  roomType: { type: Number, enum: Object.values(RoomTypes), required: true },
  price: { type: String, required: true },
});

export const HotelPriceModel = model<HotelPrice>('HotelPrice', schema);
