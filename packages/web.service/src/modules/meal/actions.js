import exactMath from 'exact-math';

import { MealPriceModel } from '../mealPrice';
import { MealTypes } from '../mealType';
import { deltaDiscountCoefficient } from './deltaDiscount';
import { MealModel } from './schema';

export const getMealTotalSpentTime = (personsMealCount) => {
  const mealTypesArray = personsMealCount.map((person) => person.mealType);
  const uniqueMealTypes = mealTypesArray.filter(
    (element, index, array) => array.indexOf(element) === index
  );
  return Object.values(MealTypes).reduce((sum, current) => {
    if (uniqueMealTypes.includes(current.code)) {
      return exactMath.add(sum, current.spentTime);
    }
    return sum;
  }, 0);
};

export const getMealTotalPrice = async (personsMealCount, seasonType, comfortLevel) => {
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
      return exactMath.mul(mealPrice.price, coefficients[type.personTypeNumber - 1]);
    })
  );
  return personTypesTotalPrices.reduce((sum, value) => sum + value).toFixed(0);
};

export const createMealServiceAction = (client, personsMealCount, seasonType, comfortLevel) => {
  const mealDate = new Date().toLocaleDateString();
  const totalMealTime = getMealTotalSpentTime(personsMealCount);
  return getMealTotalPrice(personsMealCount, seasonType, comfortLevel).then((total) =>
    MealModel.create({
      client,
      mealDate,
      personsMealCount,
      seasonType,
      comfortLevel,
      totalMealSpentTime: String(totalMealTime),
      totalPrice: String(total),
    })
  );
};

export const getAllMealServicesAction = () => MealModel.find().populate({ path: 'client' });

export const getMealServiceByIdAction = (id) => MealModel.findById(id).populate({ path: 'client' });

export const updateMealServiceAction = (id, client, mealDate, personsMealCount, mealParameters) => {
  const totalTime = getMealTotalSpentTime(personsMealCount);
  return getMealTotalPrice(
    personsMealCount,
    mealParameters.seasonType,
    mealParameters.comfortLevel
  ).then((total) =>
    MealModel.findByIdAndUpdate(
      id,
      {
        $set: {
          mealDate,
          personsMealCount,
          seasonType: mealParameters.seasonType,
          comfortLevel: mealParameters.comfortLevel,
          totalMealSpentTime: totalTime,
          totalPrice: total,
        },
      },
      { runValidators: true, new: true }
    )
  );
};

export const deleteMealServiceAction = (id) => MealModel.findByIdAndDelete(id);
