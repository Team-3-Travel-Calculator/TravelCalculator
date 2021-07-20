import { Schema, model } from 'mongoose';

export enum PersonClass {
    toddler = 1,
    driver = 2,
    baby = 3,
    child = 4,
    adult = 5,
    tourLeader = 6,
    guide = 7
}

export interface PersonType {
    readonly personType: PersonClass
}

export const schema = new Schema<PersonType>({
    personType: { type: Number, required: true }
});

const PersonTypeModel = model<PersonType>('PersonType', schema);
module.exports = PersonTypeModel;