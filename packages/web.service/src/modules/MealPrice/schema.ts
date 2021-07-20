import { Schema, model } from 'mongoose';
import { SeasonType } from "../Season";
import { PersonClass } from "../PersonType";
import { ServiceType } from "../Type";

export interface MealPrice {
    readonly personType: PersonClass;
    readonly seasonType: SeasonType;
    readonly mealType: ServiceType;
    readonly price: number;
}

export const schema = new Schema<MealPrice>({
    personType: { type: Number, required: true },
    seasonType: { type: Number, required: true },
    mealType: { type: Number, required: true },
    price: { type: Number, required: true }
});

const MealPriceModel = model<MealPrice>('MealPrice', schema);
module.exports = MealPriceModel;