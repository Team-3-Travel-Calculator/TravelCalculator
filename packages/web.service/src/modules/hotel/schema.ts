import { model, Schema } from 'mongoose';

import { SeasonTypes } from '../season';
import { ServiceTypes } from '../type';

export type Hotel = {
  readonly hotelRoomId: number;
  readonly serviceTypes: ServiceTypes;
  readonly seasonTypes: SeasonTypes;
  readonly price: number;
};

export const schema = new Schema<Hotel>({
  hotelRoomId: { type: Number, required: true },
  serviceTypes: { type: Number, enum: Object.values(ServiceTypes), required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  price: { type: Number, required: true },
});

export const HotelModel = model<Hotel>('Hotel', schema);
