export class HotelPriceAlreadyExistsError extends Error {
  constructor() {
    super(`Hotel Price with such parameters is already exists`);
    this.name = 'HotelPriceAlreadyExistsError';
  }
}
