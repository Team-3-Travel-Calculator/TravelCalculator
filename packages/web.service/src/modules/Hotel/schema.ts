import { Schema, model } from 'mongoose';
import { ServiceType } from "../Type";

export interface Hotel {
    readonly hotelRoomID: number;
    readonly type: ServiceType;
    readonly seasonID: number;
    readonly price: number;
}

export const schema = new Schema<Hotel>({
    hotelRoomID: { type: Number, required: true },
    type: { type: Number, required: true },
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    price: { type: Number, required: true }
});

const HotelModel = model<Hotel>('Hotel', schema);
module.exports = HotelModel;