import { Schema, model } from 'mongoose';
import { PersonClass } from "../PersonType";

export type Person = {
    readonly personType: PersonClass;
    readonly personQnt: number;
};

export interface Meal {
    readonly mealPrice: number;
    readonly person: readonly Person[];
    readonly discount?: number;
    readonly price: number;
}

export const schema = new Schema<Meal>({
    mealPrice: { type: Schema.Types.ObjectId, ref: 'MealPrice', required: true },
    person: [{
        personType: { type: Number, required: true },
        personQnt: { type: Number, required: true }
    }],
    discount: { type: Number },
    price: { type: Number, required: true }
});

const MealModel = model<Meal>('Meal', schema);
module.exports = MealModel;