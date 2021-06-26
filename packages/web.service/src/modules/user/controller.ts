import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/create')
  // eslint-disable-next-line class-methods-use-this
  public createUser(): string {
    return 'userCreated';
  }
}
