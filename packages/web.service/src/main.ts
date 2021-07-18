import { config } from 'dotenv';
import express, { json } from 'express';
import { logger } from 'logger';
import { resolve } from 'path';

import { databaseConnect } from './database';
import { userRouter } from './modules/user';
import { isProduction } from './services/isProduction';

export const main = async (): Promise<void> => {
  if (!isProduction()) config({ path: resolve(__dirname, '../.env') });

  const mainLogger = logger.getLogger('main');

  await databaseConnect();

  express()
    .use(json())
    .use(userRouter)
    .listen(process.env.PORT, () => {
      mainLogger.info(`successfully started application on: ${process.env.PORT}`);
    });
};
