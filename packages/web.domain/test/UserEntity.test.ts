import type { UserGateway } from '@tc/web.domain';
import { CreateUserInteractor, UserEntity } from '@tc/web.domain';

describe('UserEntity', () => {
  it('should validate email', () => {
    const entity = UserEntity.fromEmail('invalidEmail');
    expect(entity.getEmail()).toBe('invalidEmail');
  });

  it('should create user by credentials', async () => {
    const gateway: UserGateway = {
      // eslint-disable-next-line @typescript-eslint/require-await
      getByEmail: async () => null,
      // eslint-disable-next-line @typescript-eslint/require-await
      createByCredentials: async (email) => ({ email }),
    };

    const interactor = new CreateUserInteractor(gateway);
    const user = await interactor.fromCredentials('example@example.com', '123');

    expect(user).toStrictEqual({
      email: 'example@example.com',
    });
  });
});
