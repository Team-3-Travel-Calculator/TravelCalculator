import { Schema, model } from 'mongoose';
import { ServiceType } from "../Type";

export interface Transfer {
    readonly type: ServiceType;
    readonly personID: number;
    readonly seasonID: number;
    readonly transportID: string;
}

export const schema = new Schema<Transfer>({
    type: { type: Number, required: true },
    personID: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    transportID: { type: Schema.Types.ObjectId, ref: 'Transport', required: true },
});

const TransferModel = model<Transfer>('Transfer', schema);
module.exports = TransferModel;