import { Schema, model } from 'mongoose';
import { ServiceType } from "../Type";

export interface TransferPrice {
    readonly type: ServiceType;
    readonly personID: number;
    readonly seasonID: number;
    readonly transportID: string;
    readonly price: number;
}

export const schema = new Schema<TransferPrice>({
    type: { type: Number, required: true },
    personID: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    transportID: { type: Schema.Types.ObjectId, ref: 'Transport', required: true },
    price: { type: Number, required: true }
});

const TransferPriceModel = model<TransferPrice>('TransferPrice', schema);
module.exports = TransferPriceModel;