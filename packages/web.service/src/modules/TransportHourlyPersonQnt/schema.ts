import { Schema, model } from 'mongoose';
import { PersonClass } from "../PersonType";
import { TransportClass } from "../TransportType";
import { ServiceType } from "../Type";

export type Person = {
    readonly personType: PersonClass;
    readonly personQnt: number;
};

export type Transport = {
    readonly transportType: TransportClass;
    readonly transportQnt: number;
};

export interface TransportHourlyPersonQnt {
    readonly type: ServiceType;
    readonly seasonID: number;
    readonly person: readonly Person[];
    readonly transport: readonly Transport[];
}

export const schema = new Schema<TransportHourlyPersonQnt>({
    type: { type:Number, required: true },
    seasonID: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    person: [{
        personType: { type: Number, required: true },
        personQnt: { type: Number, required: true }
    }],
    transport: [{
        transportType: { type: Number, required: true },
        transportQnt: { type: Number, required: true }
    }]
});

const TransportHourlyPersonQntModel = model<TransportHourlyPersonQnt>('TransportHourlyPersonQnt', schema);
module.exports = TransportHourlyPersonQntModel;