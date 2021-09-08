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
import { LocationNotFoundError, VisitPriceAlreadyExistsError } from './errors';

const allowedPersonTypes = Object.values(PersonTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);

const visitPriceLogger = logger.getLogger('visitPrice');

export const visitPriceRouter = Router()
  .post(
    '/visitPrice',
    body('visitLocation', `Location was not found`).isMongoId(),
    body('personType', `Person type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('seasonType', `Season type must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { visitLocation, personType, seasonType, price } = req.body;
      await createVisitPriceAction(visitLocation, personType, seasonType, price)
        .then(() => {
          visitPriceLogger.info(`created new Visit price`);
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof LocationNotFoundError) {
            res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound(err.message));
          } else if (err instanceof VisitPriceAlreadyExistsError) {
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
          visitPrices.map(({ id, visitLocation, personType, seasonType, price }) => ({
            id,
            visitLocation,
            personType,
            seasonType,
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
    param('id', `Incorrect Visit price id`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getVisitPriceByIdAction(id)
        .then((visitPrice) => {
          if (visitPrice) {
            res.send({
              id: visitPrice.id,
              visitLocation: visitPrice.visitLocation,
              personType: visitPrice.personType,
              seasonType: visitPrice.seasonType,
              price: visitPrice.price,
            });
          } else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          visitPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/visitPrice/:id',
    param('id', `Incorrect Visit price id`).isMongoId(),
    body('visitLocation', `Location was not found`).isMongoId(),
    body('personType', `Person type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('seasonType', `Season type must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { visitLocation, personType, seasonType, price } = req.body;
      await updateVisitPriceAction(id, {
        visitLocation,
        personType,
        seasonType,
        price,
      })
        .then(() => {
          visitPriceLogger.info('updated Visit price with id', id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          visitPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/visitPrice/:id',
    param('id', `Incorrect Visit price id`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteVisitPriceAction(id)
        .then(() => {
          visitPriceLogger.info(`deleted Visit price with id ${id}`);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          visitPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
