export class LocationNotFoundError extends Error {
  constructor() {
    super('Location with this id not found');
    this.name = 'LocationNotFoundError';
  }
}

export class VisitPriceNotFoundError extends Error {
  constructor() {
    super('VisitPrice with this id not found');
    this.name = 'VisitPriceNotFound';
  }
}

export class VisitPriceWasCreatedError extends Error {
  constructor() {
    super('VisitPrice with the same fields was created earlier');
    this.name = 'VisitPriceWasCreatedError';
  }
}
