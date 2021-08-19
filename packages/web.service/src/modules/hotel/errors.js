export class HotelClientAlreadyExistsError extends Error {
  constructor() {
    super('Client hotel on this date with such parameters is already exists');
    this.name = 'HotelClientAlreadyExistsError';
  }
}

export class RoomsNumberNotMatchToPersonsError extends Error {
  constructor() {
    super('Number of rooms does not match to persons');
    this.name = 'RoomsNumberNotMatchToPersonsError';
  }
}
