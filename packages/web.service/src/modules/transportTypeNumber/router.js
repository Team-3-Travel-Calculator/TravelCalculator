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
  createTransportTypeNumberAction,
  deleteTransportTypeNumberAction,
  getAllTransportTypesNumbersAction,
  getTransportTypesNumberByIdAction,
  updateTransportTypeNumberAction,
} from './actions';
import { TransportTypeNumberAlreadyExistsError } from './errors';

const transportTypeNumberLogger = logger.getLogger('router.transportTypeNumber');

const allowedTransportCalculationTypes = Object.values(TransportCalculationTypes);
const allowedPersonsNumbers = Object.values(PersonsNumbers);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);
const allowedTransportTypes = Object.values(TransportTypes);

export const transportTypeNumberRouter = Router()
  .post(
    '/transportTypeNumber',
    body('calculationType', ` Calculation type must be one of: ${allowedTransportCalculationTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportCalculationTypes.includes(type)),
    body('personsNumber', ` Persons number must be one of: ${allowedPersonsNumbers}`)
      .isNumeric()
      .custom((person) => allowedPersonsNumbers.includes(person)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('transportTypeCount', `Transport type count should be an array`).isArray(),
    body('transportTypeCount.*.type', ` Transport type should be one of: ${allowedTransportTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportTypes.includes(type)),
    body(
      'transportTypeCount.*.number',
      `Transport type number should have number format`
    ).isNumeric(),
    handleValidationErrors,
    async (req, res) => {
      const { calculationType, personsNumber, seasonType, comfortLevel, transportTypeCount } =
        req.body;
      await createTransportTypeNumberAction(
        calculationType,
        personsNumber,
        seasonType,
        comfortLevel,
        transportTypeCount
      )
        .then(() => {
          transportTypeNumberLogger.info('created new Transport type number');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof TransportTypeNumberAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            transportTypeNumberLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/transportTypeNumber', handleValidationErrors, (req, res) => {
    getAllTransportTypesNumbersAction()
      .then((transportTypeNumbers) =>
        res.send(
          transportTypeNumbers.map(
            ({
              id,
              calculationType,
              personsNumber,
              seasonType,
              comfortLevel,
              transportTypeCount,
            }) => ({
              id,
              calculationType,
              personsNumber,
              seasonType,
              comfortLevel,
              transportTypeCount,
            })
          )
        )
      )
      .catch((err) => {
        transportTypeNumberLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/transportTypeNumber/:id',
    param('id', `Incorrect Transport type number id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getTransportTypesNumberByIdAction(id)
        .then((transportTypeNumber) => {
          if (transportTypeNumber)
            res.send({
              id: transportTypeNumber.id,
              calculationType: transportTypeNumber.calculationType,
              personsNumber: transportTypeNumber.personsNumber,
              seasonType: transportTypeNumber.seasonType,
              comfortLevel: transportTypeNumber.comfortLevel,
              transportTypeCount: transportTypeNumber.transportTypeCount,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          transportTypeNumberLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/transportTypeNumber/:id',
    param('id', `Incorrect Transport type number id here`).isMongoId(),
    body('calculationType', ` Calculation type must be one of: ${allowedTransportCalculationTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportCalculationTypes.includes(type)),
    body('personsNumber', ` Persons number must be one of: ${allowedPersonsNumbers}`)
      .isNumeric()
      .custom((person) => allowedPersonsNumbers.includes(person)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('transportTypeCount', `Transport type count should be an array`).isArray(),
    body('transportTypeCount.*.type', ` Transport type should be one of: ${allowedTransportTypes}`)
      .isNumeric()
      .custom((type) => allowedTransportTypes.includes(type)),
    body(
      'transportTypeCount.*.number',
      `Transport type number should have number format`
    ).isNumeric(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { calculationType, personsNumber, seasonType, comfortLevel, transportTypeCount } =
        req.body;
      await updateTransportTypeNumberAction(id, {
        calculationType,
        personsNumber,
        seasonType,
        comfortLevel,
        transportTypeCount,
      })
        .then((updatedTransportTypeNumber) => {
          transportTypeNumberLogger.info(
            'updated Transport type number with id ',
            updatedTransportTypeNumber.id
          );
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          transportTypeNumberLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/transportTypeNumber/:id',
    param('id', `Incorrect Transport type number id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteTransportTypeNumberAction(id)
        .then((deletedTransportTypeNumber) => {
          transportTypeNumberLogger.info(
            'deleted Transport type number with id ',
            deletedTransportTypeNumber.id
          );
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          transportTypeNumberLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
