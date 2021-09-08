export class TransportPriceAlreadyExistsError extends Error {
  constructor() {
    super('Transport price with such parameters is already exists');
    this.name = 'TransportPriceAlreadyExistsError';
  }
}
