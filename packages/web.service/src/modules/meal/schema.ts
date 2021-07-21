import { model, Schema } from 'mongoose';

import { PersonClasses } from '../personType';

export type Person = {
  readonly personTypes: PersonClasses;
  readonly personQnt: number;
};

export type Meal = {
  readonly mealPrice: number;
  readonly person: readonly Person[];
  readonly discount?: number;
  readonly price: number;
};

export const schema = new Schema<Meal>({
  mealPrice: { type: Schema.Types.ObjectId, ref: 'MealPrice', required: true },
  person: [
    {
      personTypes: { type: Number, enum: Object.values(PersonClasses), required: true },
      personQnt: { type: Number, required: true },
    },
  ],
  discount: { type: Number },
  price: { type: Number, required: true },
});

export const MealModel = model<Meal>('Meal', schema);
