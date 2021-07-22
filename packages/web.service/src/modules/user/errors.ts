export class EmailAlreadyExistsError extends Error {
  public constructor() {
    super('Email already exists');
    this.name = 'EmailAlreadyExistsError';
  }
}
