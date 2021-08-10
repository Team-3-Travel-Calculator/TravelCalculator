import { MealPriceModel } from '../mealPrice';
import { MealTypes } from '../mealType';
import { deltaDiscountCoefficient } from './deltaDiscount';
import { MealClientAlreadyExistsError } from './errors';
import { MealModel } from './schema';

export const getMealPresenceAction = async (mealDate) => {
  const mealPresence = await MealModel.findOne({ mealDate });
  return mealPresence;
};

export const getMealTotalSpentTime = ([personsMealCount]) => {
  const mealTypesArray = personsMealCount.map((person) => person.mealType);
  const uniqueMealTypes = mealTypesArray.filter(
    (element, index, array) => array.indexOf(element) === index
  );
  const limit = -1;
  return Object.values(MealTypes).reduce((sum, current) => {
    if (uniqueMealTypes.indexOf(current.code) !== limit) {
      return sum + parseFloat(current.spentTime);
    }
    return sum;
  }, 0);
};

export const getMealTotalPrice = async ([personsMealCount], seasonType, comfortLevel) => {
  const coefficients = [1];
  const arrayLength = 49;
  [...Array(arrayLength).keys()].forEach(() => {
    coefficients.push((coefficients[coefficients.length - 1] + 1) * deltaDiscountCoefficient);
  });

  const personTypesTotalPrices = await Promise.all(
    personsMealCount.map(async (type) => {
      const mealPrice = await MealPriceModel.findOne({
        personType: type.personType,
        mealType: type.mealType,
        seasonType,
        comfortLevel,
      });
      const priceForPersonType = parseFloat(mealPrice.price);
      return priceForPersonType * coefficients[type.personTypeNumber - 1];
    })
  );
  const total = personTypesTotalPrices.reduce((sum, value) => sum + value);
  return total.toFixed(0);
};

export const createMealServiceAction = async (
  mealDate,
  [personsMealCount],
  seasonType,
  comfortLevel
) => {
  if (await getMealPresenceAction(mealDate)) {
    return Promise.reject(new MealClientAlreadyExistsError());
  }
  const totalMealTime = getMealTotalSpentTime([personsMealCount]);
  const total = await getMealTotalPrice([personsMealCount], seasonType, comfortLevel);
  const date = new Date();
  return MealModel.create({
    mealDate: date,
    personsMealCount,
    seasonType,
    comfortLevel,
    totalMealSpentTime: String(totalMealTime),
    totalPrice: String(total),
  });
};

export const getAllMealServicesAction = async () => {
  const mealServices = await MealModel.find();
  return mealServices;
};

export const getMealServiceByIdAction = async (id) => {
  const mealService = await MealModel.findById(id);
  return mealService;
};

export const updateMealServiceAction = async (id, personsMealCount, mealService) => {
  const totalTime = getMealTotalSpentTime([personsMealCount]);
  const total = await getMealTotalPrice(
    [personsMealCount],
    mealService.seasonType,
    mealService.comfortLevel
  );

  const updatedMealService = await MealModel.findByIdAndUpdate(
    id,
    {
      $set: {
        mealDate: mealService.mealDate,
        personsMealCount,
        seasonType: mealService.seasonType,
        comfortLevel: mealService.comfortLevel,
        totalMealSpentTime: totalTime,
        totalPrice: total,
      },
    },
    { runValidators: true, new: true }
  );

  return updatedMealService;
};

export const deleteMealServiceAction = async (id) => {
  const result = await MealModel.findByIdAndDelete(id);
  return result;
};
