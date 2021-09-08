import cors from 'cors';
import { config } from 'dotenv';
import express, { json } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import { resolve } from 'path';

import { databaseConnect } from './database';
import { logger } from './logger';
import { authRouter } from './modules/auth';
import { clientRouter } from './modules/client';
import { guideRouter } from './modules/guide';
import { guidePriceRouter } from './modules/guidePrice';
import { hotelRouter } from './modules/hotel';
import { hotelPriceRouter } from './modules/hotelPrice';
import { locationRouter } from './modules/location';
import { mealRouter } from './modules/meal';
import { mealPriceRouter } from './modules/mealPrice';
import { transportRouter } from './modules/transport';
import { transportPriceRouter } from './modules/transportPrice';
import { transportTypeNumberRouter } from './modules/transportTypeNumber';
import { getOrCreateOwnerAction, getUserByTokenAction, userRouter } from './modules/user';
import { visitRouter } from './modules/visit';
import { visitPriceRouter } from './modules/visitPrice';
import { getOrCreateMaterials } from './services/getOrCreateMaterials';
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

export const main = async () => {
  if (!isProduction()) config({ path: resolve(__dirname, '../.env') });

  const mainLogger = logger.getLogger('main');

  await databaseConnect();

  passport.use(passportStrategy);

  if (!process.env.OWNER_EMAIL || !process.env.OWNER_PASS) {
    mainLogger.fatal('owner credentials were not given');
    return;
  }

  await getOrCreateOwnerAction(process.env.OWNER_EMAIL, process.env.OWNER_PASS);
  await getOrCreateMaterials();

  express()
    .use(cors())
    .use(json())
    .use(authRouter)
    .use(passport.authenticate('bearer', { session: false }))
    .use(userRouter)
    .use(clientRouter)
    .use(guidePriceRouter)
    .use(guideRouter)
    .use(mealPriceRouter)
    .use(mealRouter)
    .use(hotelPriceRouter)
    .use(hotelRouter)
    .use(locationRouter)
    .use(visitPriceRouter)
    .use(visitRouter)
    .use(transportTypeNumberRouter)
    .use(transportPriceRouter)
    .use(transportRouter)
    .listen(process.env.PORT, () => {
      mainLogger.info(`successfully started application on: ${process.env.PORT}`);
    });
};
