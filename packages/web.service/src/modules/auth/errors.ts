export class UserNotFoundError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class IncorrectPasswordError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'IncorrectPasswordError';
  }
}
