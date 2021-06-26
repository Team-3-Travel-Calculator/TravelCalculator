import { Module } from '@nestjs/common';

import { configModule } from './config.module';
import { UserModule } from './modules/user';

@Module({
  imports: [configModule, UserModule],
})
export class AppModule {}
