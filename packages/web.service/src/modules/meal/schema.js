import { model, Schema } from 'mongoose';

import { ComfortLevels } from '../comfortLevel';
import { MealTypes } from '../mealType';
import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';

const MealSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  mealDate: { type: String, required: true },
  personsMealCount: [
    {
      personType: { type: Number, enum: Object.values(PersonTypes), required: true },
      personTypeNumber: { type: Number, required: true },
      mealType: {
        type: Number,
        enum: Object.values(MealTypes).map((type) => type.code),
        required: true,
      },
    },
  ],
  seasonType: { type: Number, enum: Object.values(SeasonTypes), required: true },
  comfortLevel: { type: Number, enum: Object.values(ComfortLevels), required: true },
  totalMealSpentTime: { type: String, required: true },
  totalPrice: { type: String, required: true },
});

export const MealModel = model('Meal', MealSchema);
