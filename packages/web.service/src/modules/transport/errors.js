export class TransportTypeNotMatchToPersonsError extends Error {
  constructor() {
    super('Transport type does not match to persons');
    this.name = 'TransportTypeNotMatchToPersonsError';
  }
}
