import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { ComfortLevels } from '../comfortLevel';
import { MealTypes } from '../mealType';
import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';
import {
  createMealServiceAction,
  deleteMealServiceAction,
  getAllMealServicesAction,
  getMealServiceByIdAction,
  updateMealServiceAction,
} from './actions';

const mealLogger = logger.getLogger('router.meal');

const allowedMealTypes = Object.values(MealTypes).map((mealType) => mealType.code);
const allowedPersonTypes = Object.values(PersonTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);

export const mealRouter = Router()
  .post(
    '/meal',
    body('client', `Client field should have an id`).isMongoId(),
    body('personsMealCount', `Persons Meal count should be an Array of objects`).isArray(),
    body('personsMealCount.*.personType', ` Person type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('personsMealCount.*.mealType', ` Meal type must be one of: ${allowedMealTypes}`)
      .isNumeric()
      .custom((type) => allowedMealTypes.includes(type)),
    body(
      'personsMealCount.*.personTypeNumber',
      `Person type number should be a number`
    ).isNumeric(),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    handleValidationErrors,
    async (req, res) => {
      const { client, personsMealCount, seasonType, comfortLevel } = req.body;
      await createMealServiceAction(client, personsMealCount, seasonType, comfortLevel)
        .then(() => {
          mealLogger.info('created new Meal service');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          mealLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .get('/meal', handleValidationErrors, (req, res) => {
    getAllMealServicesAction()
      .then((meals) =>
        res.send(
          meals.map(
            ({
              id,
              client,
              mealDate,
              personsMealCount,
              seasonType,
              comfortLevel,
              totalMealSpentTime,
              totalPrice,
            }) => ({
              id,
              client,
              mealDate,
              personsMealCount,
              seasonType,
              comfortLevel,
              totalMealSpentTime,
              totalPrice,
            })
          )
        )
      )
      .catch((err) => {
        mealLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/meal/:id',
    param('id', `It should be Meal id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getMealServiceByIdAction(id)
        .then((meal) => {
          if (meal)
            res.send({
              id: meal.id,
              client: meal.client,
              mealDate: meal.mealDate,
              personsMealCount: meal.personsMealCount,
              seasonType: meal.seasonType,
              comfortLevel: meal.comfortLevel,
              totalMealSpentTime: meal.totalMealSpentTime,
              totalPrice: meal.totalPrice,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          mealLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/meal/:id',
    param('id', `It should be Meal id here`).isMongoId(),
    body('client', `Client field should have an id`).isMongoId(),
    body('mealDate', `Meal date should be a string`).isString(),
    body('personsMealCount', `Persons Meal count should be an Array of objects`).isArray(),
    body('personsMealCount.*.personType', ` Person type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('personsMealCount.*.mealType', ` Meal type must be one of: ${allowedMealTypes}`)
      .isNumeric()
      .custom((type) => allowedMealTypes.includes(type)),
    body(
      'personsMealCount.*.personTypeNumber',
      `Person type number should be a number`
    ).isNumeric(),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { client, mealDate, personsMealCount, seasonType, comfortLevel } = req.body;
      await updateMealServiceAction(id, client, mealDate, personsMealCount, {
        seasonType,
        comfortLevel,
      })
        .then((updatedMealService) => {
          mealLogger.info('updated Meal service with id ', updatedMealService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          mealLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/meal/:id',
    param('id', `It should be Meal id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteMealServiceAction(id)
        .then((deletedMealService) => {
          mealLogger.info('deleted Meal service with id ', deletedMealService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          mealLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
