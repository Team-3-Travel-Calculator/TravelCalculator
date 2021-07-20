import { Schema, model } from 'mongoose';

export interface Transport {
    readonly title: string;
    readonly description?: string;
}

export const schema = new Schema<Transport>({
    title: { type: String, required: true },
    description: { type: String }
});

const TransportModel = model<Transport>('Transport', schema);
module.exports = TransportModel;