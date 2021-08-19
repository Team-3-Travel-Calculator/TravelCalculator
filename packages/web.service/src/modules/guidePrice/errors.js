export class GuidePriceAlreadyExistsError extends Error {
  constructor() {
    super('Guide Price with such parameters is already exists');
    this.name = 'GuidePriceAlreadyExistsError';
  }
}
