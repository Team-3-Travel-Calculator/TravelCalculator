import { model, Schema } from 'mongoose';

import { ServiceTypes } from '../comfortLevel';
import { PersonClasses } from '../personType';
import { SeasonTypes } from '../season';

export type MealPrice = {
  readonly personType: PersonClasses;
  readonly seasonTypes: SeasonTypes;
  readonly mealType: ServiceTypes;
  readonly price: number;
};

export const schema = new Schema<MealPrice>({
  personType: { type: Number, enum: Object.values(PersonClasses), required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  mealType: { type: Number, enum: Object.values(ServiceTypes), required: true },
  price: { type: Number, required: true },
});

export const MealPriceModel = model<MealPrice>('MealPrice', schema);
