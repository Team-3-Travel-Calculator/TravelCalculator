import { Schema, model } from 'mongoose';

export enum TransportClass {
    sedan = 1,
    minivan = 2,
    minibus = 3,
    bus = 4,
    jeep = 5
}

export interface TransportType {
    type: TransportClass;
    description?: string;
}

export const schema = new Schema<TransportType>({
    title: { type: Number, required: true },
    description: { type: String }
});

const TransportTypeModel = model<TransportType>('TransportType', schema);
module.exports = TransportTypeModel;