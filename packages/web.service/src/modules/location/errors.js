export class LocationAlreadyExistsError extends Error {
  constructor() {
    super('Location already exists ');
    this.name = 'LocationAlreadyExistsError';
  }
}
