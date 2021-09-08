export class RoomsNumberNotMatchToPersonsError extends Error {
  constructor() {
    super('Number of rooms does not match to persons');
    this.name = 'RoomsNumberNotMatchToPersonsError';
  }
}
