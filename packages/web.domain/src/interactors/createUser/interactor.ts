import { UserEntity } from '../../entities/user';
import type { UserGateway } from '../../gateway/user';
import { CreateUserErrors } from './errors';
import type { CreateUserFromCredentials } from './types/CreateUserFromCredentials';

export class CreateUserInteractor {
  protected readonly userGateway: UserGateway;

  public constructor(userGateway: UserGateway) {
    this.userGateway = userGateway;
  }

  public readonly fromCredentials = async (
    email: string,
    password: string
  ): Promise<CreateUserFromCredentials> => {
    const userEntity = new UserEntity({ email });

    const user = await this.userGateway.getByEmail(userEntity.getEmail());
    if (user !== null) throw new Error(CreateUserErrors.AlreadyExists);

    const result = await this.userGateway.createByCredentials(userEntity.getEmail(), password);
    return { email: result.email };
  };
}
