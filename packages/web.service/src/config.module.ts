import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

const envFilePath = resolve(__dirname, '../.env');
const isProd = process.env.NODE_ENV === 'production';

export const configModule = ConfigModule.forRoot({
  ignoreEnvFile: isProd,
  envFilePath,
});
