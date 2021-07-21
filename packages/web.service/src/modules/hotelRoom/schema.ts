import { model, Schema } from 'mongoose';

export enum HotelTypes {
  Econom = 1,
  Standard = 2,
  Business = 3,
}

export type HotelRoom = {
  readonly hotelRoomId: number;
  readonly hotelType: HotelTypes;
  readonly roomType: HotelTypes;
  readonly peopleInRoom: number;
};

export const schema = new Schema<HotelRoom>({
  hotelRoomId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  hotelType: { type: Number, enum: Object.values(HotelTypes), required: true },
  roomType: { type: Number, required: true },
  peopleInRoom: { type: Number, required: true },
});

export const HotelRoomModel = model<HotelRoom>('HotelRoom', schema);
