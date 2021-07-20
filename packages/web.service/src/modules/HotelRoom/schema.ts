import { Schema, model } from 'mongoose';

export enum HotelType {
    econom = 1,
    standard = 2,
    business = 3
}

export interface HotelRoom {
    readonly hotelRoomID: number;
    readonly hotelType: HotelType;
    readonly roomType: HotelType;
    readonly peopleInRoom: number;
}

export const schema = new Schema<HotelRoom>({
    hotelRoomID: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    hotelType: { type: Number, required: true },
    roomType: { type: Number, required: true },
    peopleInRoom: { type: Number, required: true }
});

const HotelRoomModel = model<HotelRoom>('HotelRoom', schema);
module.exports = HotelRoomModel;