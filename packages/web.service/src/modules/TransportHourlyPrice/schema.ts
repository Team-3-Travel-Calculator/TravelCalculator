import { Schema, model } from 'mongoose';
import { ServiceType } from "../Type";
import {TransportClass} from "../TransportType";

export interface TransportHourlyPrice {
    readonly type: ServiceType;
    readonly seasonID: number;
    readonly transportType: TransportClass;
    readonly totalPrice: number;
}

export const schema = new Schema<TransportHourlyPrice>({
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    type: { type: Number, required: true },
    transportType: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const TransportHourlyPriceModel = model<TransportHourlyPrice>('TransportHourlyPrice', schema);
module.exports = TransportHourlyPriceModel;