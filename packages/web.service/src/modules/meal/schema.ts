import { model, Schema } from 'mongoose';

import type { Client } from '../client';
import { ComfortLevels } from '../comfortLevel';
import { MealTypes } from '../mealType';
import { PersonType } from '../personType';
import { SeasonTypes } from '../season';

export type MealPersonTypeCount = {
  readonly personType: PersonType;
  readonly personTypeNumber: number;
  readonly mealType: MealTypes;
};

export type Meal = {
  readonly client: Client;
  readonly mealDate: Date;
  readonly personsMealCount: readonly MealPersonTypeCount[];
  readonly seasonType: SeasonTypes;
  readonly comfortLevel: ComfortLevels;
  readonly totalMealSpentTime: string;
};

export const schema = new Schema<Meal>({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  mealDate: { type: Date, required: true },
  personsMealCount: [
    {
      personType: { type: Number, enum: Object.values(PersonType), required: true },
      personTypeNumber: { type: Number, required: true },
      mealType: { type: Number, enum: Object.values(MealTypes), required: true },
    },
  ],
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  totalMealSpentTime: { type: String, required: true },
});

export const MealModel = model<Meal>('Meal', schema);
