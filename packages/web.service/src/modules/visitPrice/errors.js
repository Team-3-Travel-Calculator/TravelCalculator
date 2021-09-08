export class LocationNotFoundError extends Error {
  constructor() {
    super('Location with this id was not found');
    this.name = 'LocationNotFoundError';
  }
}

export class VisitPriceAlreadyExistsError extends Error {
  constructor() {
    super('Visit price with such parameters is already exists');
    this.name = 'VisitPriceAlreadyExistsError';
  }
}
