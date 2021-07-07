import { config } from 'dotenv';
import express from 'express';
import { logger } from 'logger';
import { resolve } from 'path';

import mongoConnection from './services/connectMongo';
import { isProduction } from './services/isProduction';

export const main = (): void => {
  if (!isProduction()) config({ path: resolve(__dirname, '../.env') });

  const mainLogger = logger.getLogger('main');

  mongoConnection().catch((error: string) => mainLogger.debug(error));

  const app = express();

  app.listen(process.env.PORT, () => {
    mainLogger.info(`successfully started application on: ${process.env.PORT}`);
  });
};
