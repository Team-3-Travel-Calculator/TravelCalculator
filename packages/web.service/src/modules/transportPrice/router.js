import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { ComfortLevels } from '../comfortLevel';
import { SeasonTypes } from '../season';
import { TransportCalculationTypes, TransportTypes } from '../transportType';
import {
  createTransportPriceAction,
  deleteTransportPriceAction,
  getAllTransportPricesAction,
  getTransportPriceByIdAction,
  updateTransportPriceAction,
} from './actions';
import { TransportPriceAlreadyExistsError } from './errors';

const transportPriceLogger = logger.getLogger('router.transportPrice');

const allowedTransportCalculationTypes = Object.values(TransportCalculationTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);
const allowedTransportTypes = Object.values(TransportTypes);

export const transportPriceRouter = Router()
  .post(
    '/transportPrice',
    body('calculationType', ` Calculation type must be one of: ${allowedTransportCalculationTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportCalculationTypes.includes(type)),
    body('transportType', ` Transport type should be one of: ${allowedTransportTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('price', `Price should be entered`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { calculationType, transportType, seasonType, comfortLevel, price } = req.body;
      await createTransportPriceAction(
        calculationType,
        transportType,
        seasonType,
        comfortLevel,
        price
      )
        .then(() => {
          transportPriceLogger.info('created new Transport price');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof TransportPriceAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            transportPriceLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/transportPrice', handleValidationErrors, (req, res) => {
    getAllTransportPricesAction()
      .then((transportPrices) =>
        res.send(
          transportPrices.map(
            ({ id, calculationType, transportType, seasonType, comfortLevel, price }) => ({
              id,
              calculationType,
              transportType,
              seasonType,
              comfortLevel,
              price,
            })
          )
        )
      )
      .catch((err) => {
        transportPriceLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/transportPrice/:id',
    param('id', `Incorrect Transport price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getTransportPriceByIdAction(id)
        .then((transportPrice) => {
          if (transportPrice)
            res.send({
              id: transportPrice.id,
              calculationType: transportPrice.calculationType,
              transportType: transportPrice.transportType,
              seasonType: transportPrice.seasonType,
              comfortLevel: transportPrice.comfortLevel,
              price: transportPrice.price,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          transportPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/transportPrice/:id',
    param('id', `Incorrect Transport price id here`).isMongoId(),
    body('calculationType', ` Calculation type must be one of: ${allowedTransportCalculationTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportCalculationTypes.includes(type)),
    body('transportType', ` Transport type should be one of: ${allowedTransportTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('price', `Price should be entered`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { calculationType, transportType, seasonType, comfortLevel, price } = req.body;
      await updateTransportPriceAction(id, {
        calculationType,
        transportType,
        seasonType,
        comfortLevel,
        price,
      })
        .then((updatedTransportPrice) => {
          transportPriceLogger.info('updated Transport price with id ', updatedTransportPrice.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          transportPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/transportPrice/:id',
    param('id', `Incorrect Transport price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteTransportPriceAction(id)
        .then((deletedTransportPrice) => {
          transportPriceLogger.info('deleted Transport price with id ', deletedTransportPrice.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          transportPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
