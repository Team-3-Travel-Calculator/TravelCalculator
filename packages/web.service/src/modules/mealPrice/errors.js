export class MealPriceAlreadyExistsError extends Error {
  constructor() {
    super('Price of mealType with such parameters is already exists');
    this.name = 'MealPriceAlreadyExistsError';
  }
}
