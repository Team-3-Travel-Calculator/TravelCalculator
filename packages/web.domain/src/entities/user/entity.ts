import type { UserEntityModel } from './model';

export class UserEntity {
  protected readonly userEntityModel: UserEntityModel;

  public constructor(userEntityModel: UserEntityModel) {
    this.userEntityModel = userEntityModel;
  }

  public static readonly fromEmail = (email: string): UserEntity => new UserEntity({ email });

  public readonly getEmail = (): string => this.userEntityModel.email;
}
