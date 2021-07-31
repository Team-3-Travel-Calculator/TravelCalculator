import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { MealTypes } from '../mealType';
import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';

const MealPriceSchema = new Schema({
  personType: { type: Number, enum: Object.values(PersonTypes), required: true },
  seasonTypes: { type: Number, enum: Object.values(SeasonTypes), required: true },
  mealType: {
    type: Number,
    enum: Object.values(MealTypes).map((type) => type.code),
    required: true,
  },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  price: { type: String, required: true },
});

export const MealPriceModel = model('MealPrice', MealPriceSchema);
