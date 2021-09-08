import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { ComfortLevels } from '../comfortLevel';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import { TransportCalculationTypes, TransportTypes } from '../transportType';
import {
  createTransportServiceAction,
  deleteTransportServiceAction,
  getAllTransportServicesAction,
  getTransportServiceByIdAction,
  updateTransportServiceAction,
} from './actions';
import { TransportTypeNotMatchToPersonsError } from './errors';

const transportLogger = logger.getLogger('router.transport');

const allowedPersonsNumbers = Object.values(PersonsNumbers);
const allowedTransportCalculationTypes = Object.values(TransportCalculationTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);
const allowedTransportTypes = Object.values(TransportTypes);

export const transportRouter = Router()
  .post(
    '/transport',
    body('client', `Client field should have an id`).isMongoId(),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('personsNumber', ` Persons number must be one of: ${allowedPersonsNumbers}`)
      .isNumeric()
      .custom((person) => allowedPersonsNumbers.includes(person)),
    body('transportType', ` Transport type should be one of: ${allowedTransportTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportTypes.includes(type)),
    body('calculationType', ` Calculation type must be one of: ${allowedTransportCalculationTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportCalculationTypes.includes(type)),
    handleValidationErrors,
    async (req, res) => {
      const { client, personsNumber, seasonType, comfortLevel, transportType, calculationType } =
        req.body;
      await createTransportServiceAction(client, {
        personsNumber,
        seasonType,
        comfortLevel,
        transportType,
        calculationType,
      })
        .then(() => {
          transportLogger.info('created new Transport service');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof TransportTypeNotMatchToPersonsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          }
          transportLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .get('/transport', handleValidationErrors, (req, res) => {
    getAllTransportServicesAction()
      .then((transportServices) =>
        res.send(
          transportServices.map(
            ({
              id,
              client,
              transportationDate,
              personsNumber,
              seasonType,
              comfortLevel,
              calculationType,
              transportType,
              transportTypeNumber,
              workHours,
              totalPrice,
            }) => ({
              id,
              client,
              transportationDate,
              personsNumber,
              seasonType,
              comfortLevel,
              calculationType,
              transportType,
              transportTypeNumber,
              workHours,
              totalPrice,
            })
          )
        )
      )
      .catch((err) => {
        transportLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/transport/:id',
    param('id', `Incorrect Transport id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getTransportServiceByIdAction(id)
        .then((transportService) => {
          if (transportService)
            res.send({
              id: transportService.id,
              client: transportService.client,
              transportationDate: transportService.transportationDate,
              personsNumber: transportService.personsNumber,
              seasonType: transportService.seasonType,
              comfortLevel: transportService.comfortLevel,
              calculationType: transportService.calculationType,
              transportType: transportService.transportType,
              transportTypeNumber: transportService.transportTypeNumber,
              workHours: transportService.workHours,
              totalPrice: transportService.totalPrice,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          transportLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/transport/:id',
    param('id', `It should be Hotel service id here`).isMongoId(),
    body('client', `Client field should have an id`).isMongoId(),
    body('transportationDate', `Stay date should be a string`).isString(),
    body('personsNumber', `Persons number should be one of: ${allowedPersonsNumbers}`)
      .isNumeric()
      .custom((number) => allowedPersonsNumbers.includes(number)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body(
      'calculationType',
      `Calculation type should be one of: ${allowedTransportCalculationTypes}`
    )
      .isNumeric()
      .custom((type) => allowedTransportCalculationTypes.includes(type)),
    body('transportType', `Transport type should be one of: ${allowedTransportTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportTypes.includes(type)),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const {
        client,
        transportationDate,
        personsNumber,
        seasonType,
        comfortLevel,
        calculationType,
        transportType,
      } = req.body;
      await updateTransportServiceAction(id, client, transportationDate, {
        personsNumber,
        calculationType,
        seasonType,
        comfortLevel,
        transportType,
      })
        .then((updatedTransportService) => {
          transportLogger.info('updated Transport service with id: ', updatedTransportService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          transportLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/transport/:id',
    param('id', `Incorrect Transport service id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteTransportServiceAction(id)
        .then((deletedTransportService) => {
          transportLogger.info('deleted Transport service with id: ', deletedTransportService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          transportLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
