import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

const defaultPort = 6901;

export const main = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.listen(defaultPort);
};
