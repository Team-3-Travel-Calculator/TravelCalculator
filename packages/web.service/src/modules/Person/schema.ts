import { Schema, model } from 'mongoose';

export interface Person {
    readonly quantity: number;
}

export const schema = new Schema<Person>({
    quantity: { type: Number, required: true },
});

const PersonModel = model<Person>('Person', schema);
module.exports = PersonModel;