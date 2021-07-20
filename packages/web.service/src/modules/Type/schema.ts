import { Schema, model } from 'mongoose';

export enum ServiceType {
    econom = 1,
    standard = 2,
    business = 3
}

export interface Type {
    readonly type: ServiceType;
}

export const schema = new Schema<Type>({
    type: { type: Number, required: true }
});

const TypeModel = model<Type>('Type', schema);
module.exports = TypeModel;