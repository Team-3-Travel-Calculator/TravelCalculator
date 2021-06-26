import type { UserGatewayCreateByCredentialsDto } from './types/UserGatewayCreateByCredentialsDto';
import type { UserGatewayGetByEmailDto } from './types/UserGatewayGetByEmailDto';

export type UserGateway = {
  readonly getByEmail: (email: string) => Promise<UserGatewayGetByEmailDto | null>;
  readonly createByCredentials: (
    email: string,
    password: string
  ) => Promise<UserGatewayCreateByCredentialsDto>;
};
