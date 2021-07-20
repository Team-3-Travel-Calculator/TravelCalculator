import { Schema, model } from 'mongoose';
import { ServiceType } from "../Type";
import { TransportClass } from "../TransportType";

export type Transport = {
    readonly transportType: TransportClass;
    readonly transportTypeQnt: number;
    readonly transportHourlyPrice: number;
};

export interface TransportHourlyTotalPrice {
    type: ServiceType;
    seasonID: number;
    readonly transport: readonly Transport[];
    totalHours: number;
    totalPrice: number;
}

export const schema = new Schema<TransportHourlyTotalPrice>({
    type: { type: Number, required: true },
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    transport: [{
        transportType: { type: Number, required: true },
        transportQnt: { type: Schema.Types.ObjectId, ref: 'TransportHourlyPersonQnt', required: true },
        transportHourlyPrice: { type: Schema.Types.ObjectId, ref: 'TransportHourlyPrice', required: true },
    }],
    totalHours: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const TransportHourlyTotalPriceModel = model<TransportHourlyTotalPrice>('TransportHourlyTotalPrice', schema);
module.exports = TransportHourlyTotalPriceModel;