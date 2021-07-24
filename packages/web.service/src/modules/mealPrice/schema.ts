import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { MealTypes } from '../mealType';
import { PersonType } from '../personType';
import type { PriceRaw } from '../price';
import { SeasonTypes } from '../season';

export type MealPrice = {
  readonly personType: PersonType;
  readonly seasonType: SeasonTypes;
  readonly mealType: MealTypes;
  readonly comfortLevel: ComfortLevels;
  readonly price: PriceRaw;
};

export const schema = new Schema<MealPrice>({
  personType: { type: Number, enum: Object.values(PersonType), required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  mealType: { type: Number, enum: Object.values(MealTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  price: { type: String, required: true },
});

export const MealPriceModel = model<MealPrice>('MealPrice', schema);
