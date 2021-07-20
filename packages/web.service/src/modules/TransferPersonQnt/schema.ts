import { Schema, model } from 'mongoose';
import { TransportClass } from "../TransportType";
import { ServiceType } from "../Type";

export type Transport = {
    readonly transportType: TransportClass;
    readonly transportQnt: number;
};

export interface TransferPersonQnt {
    readonly personQnt: number,
    readonly seasonID: number;
    readonly type: ServiceType;
    readonly transport: readonly Transport[];
}

export const schema = new Schema<TransferPersonQnt>({
    personType: { type: Number, required: true },
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    type: { type: Number, required: true },
    transport: [{
        transportType: { type: Number, required: true },
        transportQnt: { type: Number, required: true }
    }]
});

const TransferPersonQntModel = model<TransferPersonQnt>('TransferPersonQnt', schema);
module.exports = TransferPersonQntModel;