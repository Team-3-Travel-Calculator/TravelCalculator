import { config } from 'dotenv';
import express, { json } from 'express';
import { logger } from 'logger';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import { resolve } from 'path';

import { databaseConnect } from './database';
import { authRouter } from './modules/auth';
import { getOrCreateOwnerAction, getUserByTokenAction, userRouter } from './modules/user';
import { isProduction } from './services/isProduction';

const passportStrategy = new Strategy((token, done) => {
  getUserByTokenAction(token)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

export const main = async (): Promise<void> => {
  if (!isProduction()) config({ path: resolve(__dirname, '../.env') });

  const mainLogger = logger.getLogger('main');

  await databaseConnect();

  passport.use(passportStrategy);

  if (!process.env.OWNER_EMAIL || !process.env.OWNER_PASS) {
    mainLogger.fatal('owner credentials were not given');
    return;
  }

  await getOrCreateOwnerAction(process.env.OWNER_EMAIL, process.env.OWNER_PASS);

  express()
    .use(json())
    .use(authRouter)
    .use(passport.authenticate('bearer', { session: false }))
    .use(userRouter)
    .listen(process.env.PORT, () => {
      mainLogger.info(`successfully started application on: ${process.env.PORT}`);
    });
};
