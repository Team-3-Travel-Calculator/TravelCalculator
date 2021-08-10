import { MealPriceAlreadyExistsError } from './errors';
import { MealPriceModel } from './schema';

export const getMealPricePresenceAction = async (
  mealType,
  personType,
  seasonType,
  comfortLevel
) => {
  const presence = await MealPriceModel.findOne({ mealType, personType, seasonType, comfortLevel });
  return presence;
};

export const createMealPriceAction = async (
  mealType,
  personType,
  seasonType,
  comfortLevel,
  price
) => {
  if (await getMealPricePresenceAction(mealType, personType, seasonType, comfortLevel)) {
    return Promise.reject(new MealPriceAlreadyExistsError());
  }
  return MealPriceModel.create({ mealType, personType, seasonType, comfortLevel, price });
};

export const getAllMealTypesPricesAction = async () => {
  const mealTypes = await MealPriceModel.find();
  return mealTypes;
};

export const getMealPriceByIdAction = async (id) => {
  const mealPrice = await MealPriceModel.findById(id);
  return mealPrice;
};

export const updateMealTypeDataAction = async (id, meal) => {
  const updatedMealPrice = await MealPriceModel.findByIdAndUpdate(
    id,
    {
      $set: {
        mealType: meal.mealType,
        personType: meal.personType,
        seasonType: meal.seasonType,
        comfortLevel: meal.comfortLevel,
        price: meal.price,
      },
    },
    { runValidators: true, new: true }
  );
  return updatedMealPrice;
};

export const deleteMealPriceAction = async (id) => {
  const result = await MealPriceModel.findByIdAndDelete(id);
  return result;
};
