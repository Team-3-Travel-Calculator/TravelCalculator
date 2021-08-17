import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';
import {
  createVisitPriceAction,
  deleteVisitPriceAction,
  getAllVisitPricesAction,
  getVisitPriceByIdAction,
  updateVisitPriceAction,
} from './actions';
import { LocationNotFoundError, VisitPriceNotFoundError, VisitPriceWasCreatedError } from './error';

const allowedPersonTypes = Object.values(PersonTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);

const visitPriceLogger = logger.getLogger('visitPrice');

export const visitPriceRouter = Router()
  .post(
    '/visitPrice',
    body('visitLocation', `Location is not found`).isMongoId(),
    body('personType', `Person Type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('season', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { visitLocation, personType, season, price } = req.body;
      await createVisitPriceAction(visitLocation, personType, season, price)
        .then(() => {
          visitPriceLogger.info(`created new visit price`);
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof LocationNotFoundError) {
            res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound(err.message));
          } else if (err instanceof VisitPriceWasCreatedError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            visitPriceLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/visitPrice', async (req, res) => {
    await getAllVisitPricesAction()
      .then((visitPrices) => {
        res.send(
          visitPrices.map(({ id, visitLocation, personType, season, price }) => ({
            id,
            visitLocation,
            personType,
            season,
            price,
          }))
        );
      })
      .catch((err) => {
        visitPriceLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/visitPrice/:id',
    param('id', `It should be visitPrice id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getVisitPriceByIdAction(id)
        .then((visitPrice) => {
          res.send({
            id: visitPrice.id,
            visitLocation: visitPrice.visitLocation,
            personType: visitPrice.personType,
            season: visitPrice.season,
            price: visitPrice.price,
          });
        })
        .catch((err) => {
          if (err instanceof VisitPriceNotFoundError) {
            res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound(err.message));
          } else visitPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/visitPrice/:id',
    body('visitLocation', `Location is not found`).isMongoId(),
    body('personType', `Person Type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('season', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    param('id', `It should be visitPrice id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { visitLocation, personType, season, price } = req.body;
      await updateVisitPriceAction(id, {
        visitLocation,
        personType,
        season,
        price,
      })
        .then((visitPrice) => {
          visitPriceLogger.info(`updated visitPrice object with id ${visitPrice.id}`);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          if (err instanceof VisitPriceNotFoundError) {
            res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound(err.message));
          } else visitPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/visitPrice/:id',
    param('id', `It should be visitPrice id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteVisitPriceAction(id)
        .then((visitPrice) => {
          visitPriceLogger.info(`deleted visitPrice object with id ${visitPrice.id}`);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          if (err instanceof VisitPriceNotFoundError) {
            res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound(err.message));
          } else visitPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
