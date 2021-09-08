export class OrderedLocationNotFoundError extends Error {
  constructor() {
    super('Ordered location with this id was not found');
    this.name = 'OrderedLocationNotFoundError';
  }
}
