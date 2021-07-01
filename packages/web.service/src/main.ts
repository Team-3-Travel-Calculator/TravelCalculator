import { config } from 'dotenv';
import express from 'express';
import { logger } from 'logger';
import { resolve } from 'path';

import { isProduction } from './services/isProduction';

export const main = (): void => {
  if (!isProduction()) config({ path: resolve(__dirname, '../.env') });

  const mainLogger = logger.getLogger('main');

  const app = express();

  app.listen(process.env.PORT, () => {
    mainLogger.info(`successfully started application on: ${process.env.PORT}`);
  });
};
