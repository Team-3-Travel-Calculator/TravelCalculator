export class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class IncorrectPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncorrectPasswordError';
  }
}
