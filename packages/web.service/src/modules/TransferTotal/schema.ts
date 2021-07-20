import { Schema, model } from 'mongoose';
import { TransportClass } from "../TransportType";
import { PersonClass } from "../PersonType";
import { ServiceType } from "../Type";

export type Transport = {
    readonly transportType: TransportClass;
    readonly transportQnt: number;
};

export type Person = {
    readonly personType: PersonClass;
    readonly personQnt: number;
};

export interface TransferTotal {
    readonly type: ServiceType;
    readonly seasonID: number;
    readonly totalPrice: number;
    readonly person: readonly Person[];
    readonly transport: readonly Transport[];
}

export const schema = new Schema<TransferTotal>({
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    type: { type: Number, required: true },
    person: [{
        personType: { type: Number, required: true },
        personQnt: { type: Number, required: true }
    }],
    transport: [{
        transportType: { type: Number, required: true },
        transportQnt: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true }
});

const TransferTotalModel = model<TransferTotal>('TransferTotal', schema);
module.exports = TransferTotalModel;