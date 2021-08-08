export class ClientAlreadyExistsError extends Error {
  constructor() {
    super('Client with this name is already exists');
    this.name = 'ClientAlreadyExistsError';
  }
}
