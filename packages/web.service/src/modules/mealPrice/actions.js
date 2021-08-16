import { MealPriceAlreadyExistsError } from './errors';
import { MealPriceModel } from './schema';

export const getMealPricePresenceAction = (mealType, personType, seasonType, comfortLevel) =>
  MealPriceModel.findOne({ mealType, personType, seasonType, comfortLevel });

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

export const getAllMealTypesPricesAction = () => MealPriceModel.find();

export const getMealPriceByIdAction = (id) => MealPriceModel.findById(id);

export const updateMealTypeDataAction = (id, meal) =>
  MealPriceModel.findByIdAndUpdate(
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

export const deleteMealPriceAction = (id) => MealPriceModel.findByIdAndDelete(id);
