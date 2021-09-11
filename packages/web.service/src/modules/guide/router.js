import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { ComfortLevels } from '../comfortLevel';
import { GuideTypes } from '../guideTypes';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import {
  createGuideServiceAction,
  deleteGuideServiceAction,
  getAllGuideServicesAction,
  getGuideServiceByIdAction,
  updateGuideServiceAction,
} from './actions';

const guideLogger = logger.getLogger('router.guide');

const allowedGuideTypes = Object.values(GuideTypes);
const allowedPersonsNumber = Object.values(PersonsNumbers);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);

export const guideRouter = Router()
  .post(
    '/guide',
    body('client', `Client field should have an id`).isMongoId(),
    body('workDate', `Work date should be a string`).isString(),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('guidesList', `Guides list should be an array`).isArray(),
    body('guidesList.*.type', `Guide type must be one of: ${allowedGuideTypes}`)
      .isNumeric()
      .custom((type) => allowedGuideTypes.includes(type)),
    body('guidesList.*.personsNumber', `Persons numbers must be one of: ${allowedPersonsNumber}`)
      .isNumeric()
      .custom((number) => allowedPersonsNumber.includes(number)),
    body('guidesList.*.number', `Number of guides should have number type`).isNumeric(),
    body('guidesList.*.name', `Name should be a string`).isString().isLength({ min: 2 }),
    body('guidesList.*.workHours'),
    handleValidationErrors,
    async (req, res) => {
      const { client, workDate, seasonType, comfortLevel, guidesList } = req.body;
      await createGuideServiceAction(client, workDate, seasonType, comfortLevel, guidesList)
        .then(() => {
          guideLogger.info('created new Guide service');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          guideLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .get('/guide', handleValidationErrors, (req, res) => {
    getAllGuideServicesAction()
      .then((guideServices) =>
        res.send(
          guideServices.map(
            ({ id, client, workDate, seasonType, comfortLevel, guidesList, totalPrice }) => ({
              id,
              client,
              workDate,
              seasonType,
              comfortLevel,
              guidesList,
              totalPrice,
            })
          )
        )
      )
      .catch((err) => {
        guideLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/guide/:id',
    param('id', `It should be Guide id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getGuideServiceByIdAction(id)
        .then((guideService) => {
          if (guideService)
            res.send({
              id: guideService.id,
              client: guideService.client,
              workDate: guideService.workDate,
              seasonType: guideService.seasonType,
              comfortLevel: guideService.comfortLevel,
              guidesList: guideService.guidesList,
              totalPrice: guideService.price,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          guideLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/guide/:id',
    param('id', `It should be Guide service id here`).isMongoId(),
    body('client', `Client field should have an id`).isMongoId(),
    body('workDate', `Work date should be a string`).isString(),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('guidesList', `Guides list should be an array`).isArray(),
    body('guidesList.*.type', `Guide type must be one of: ${allowedGuideTypes}`)
      .isNumeric()
      .custom((type) => allowedGuideTypes.includes(type)),
    body('guidesList.*.number', `Number of guides should have number type`).isNumeric(),
    body('guidesList.*.personsNumber', `Persons numbers must be one of: ${allowedPersonsNumber}`)
      .isNumeric()
      .custom((number) => allowedPersonsNumber.includes(number)),
    body('guidesList.*.name', `Name should be a string`).isString().isLength({ min: 2 }),
    body('guidesList.*.workHours', `Work hours should be a string`),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { client, workDate, seasonType, comfortLevel, guidesList } = req.body;
      await updateGuideServiceAction(id, client, workDate, { seasonType, comfortLevel }, guidesList)
        .then((updatedGuideService) => {
          guideLogger.info('updated Guide service with id ', updatedGuideService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          guideLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/guide/:id',
    param('id', `It should be Guide id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteGuideServiceAction(id)
        .then((deletedGuideService) => {
          guideLogger.info('deleted Guide service with id ', deletedGuideService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          guideLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
