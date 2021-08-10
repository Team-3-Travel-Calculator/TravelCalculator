export class MealClientAlreadyExistsError extends Error {
  constructor() {
    super('Client meal on this date is already exists');
    this.name = 'MealClientAlreadyExistsError';
  }
}
