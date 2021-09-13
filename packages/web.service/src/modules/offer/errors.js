export class ClientNotFoundError extends Error {
  constructor() {
    super('Client with this id is not found');
    this.name = 'ClientNotFoundError';
  }
}
