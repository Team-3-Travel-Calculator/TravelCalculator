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
  createMealPriceAction,
  deleteMealPriceAction,
  getAllMealTypesPricesAction,
  getMealPriceByIdAction,
  updateMealTypeDataAction,
} from './actions';
import { MealPriceAlreadyExistsError } from './errors';

const mealPriceLogger = logger.getLogger('router.mealPrice');

const allowedMealTypes = Object.values(MealTypes).map((mealType) => mealType.code);
const allowedPersonTypes = Object.values(PersonTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);

export const mealPriceRouter = Router()
  .post(
    '/mealPrice',
    body('mealType', ` Meal type must be one of: ${allowedMealTypes}`)
      .isNumeric()
      .custom((type) => allowedMealTypes.includes(type)),
    body('personType', ` Person type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('price', `Price should be entered`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { mealType, personType, seasonType, comfortLevel, price } = req.body;
      await createMealPriceAction(mealType, personType, seasonType, comfortLevel, price)
        .then(() => {
          mealPriceLogger.info('created new Meal price');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof MealPriceAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            mealPriceLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/mealPrice', handleValidationErrors, (req, res) => {
    getAllMealTypesPricesAction()
      .then((meals) =>
        res.send(
          meals.map(({ id, mealType, personType, seasonType, comfortLevel, price }) => ({
            id,
            mealType,
            personType,
            seasonType,
            comfortLevel,
            price,
          }))
        )
      )
      .catch((err) => {
        mealPriceLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/mealPrice/:id',
    param('id', `It should be Meal price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getMealPriceByIdAction(id)
        .then((meal) => {
          if (meal)
            res.send({
              id: meal.id,
              mealType: meal.mealType,
              personType: meal.personType,
              seasonType: meal.seasonType,
              comfortLevel: meal.comfortLevel,
              price: meal.price,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          mealPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/mealPrice/:id',
    param('id', `It should be Meal price id here`).isMongoId(),
    body('mealType', ` Meal type must be one of: ${allowedMealTypes}`)
      .isNumeric()
      .custom((type) => allowedMealTypes.includes(type)),
    body('personType', ` Person type must be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort Level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((type) => allowedComfortLevels.includes(type)),
    body('price', `Price should be entered`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { mealType, personType, seasonType, comfortLevel, price } = req.body;
      await updateMealTypeDataAction(id, { mealType, personType, seasonType, comfortLevel, price })
        .then((updatedMealPrice) => {
          mealPriceLogger.info(
            'updated Meal price:',
            updatedMealPrice.mealType,
            ' with id ',
            updatedMealPrice.id
          );
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          mealPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/mealPrice/:id',
    param('id', `It should be Meal price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteMealPriceAction(id)
        .then((deletedMealPrice) => {
          mealPriceLogger.info(
            'deleted Meal price:',
            deletedMealPrice.mealType,
            ' with id ',
            deletedMealPrice.id
          );
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          mealPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
