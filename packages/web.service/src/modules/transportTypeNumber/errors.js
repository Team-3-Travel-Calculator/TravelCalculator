export class TransportTypeNumberAlreadyExistsError extends Error {
  constructor() {
    super('Transport type number with such parameters is already exists');
    this.name = 'TransportTypeNumberAlreadyExistsError';
  }
}
