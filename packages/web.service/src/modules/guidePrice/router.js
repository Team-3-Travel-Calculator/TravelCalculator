import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { ComfortLevels } from '../comfortLevel';
import { GuideGroupSizes, GuideTypes, WorkTermTypes } from '../guideTypes';
import { SeasonTypes } from '../season';
import {
  createGuidePriceAction,
  deleteGuidePriceAction,
  getAllGuideTypesPricesAction,
  getGuidePriceByIdAction,
  updateGuidePriceAction,
} from './actions';
import { GuidePriceAlreadyExistsError } from './errors';

const guidePriceLogger = logger.getLogger('router.guidePrice');

const allowedGuideTypes = Object.values(GuideTypes);
const allowedGuideGroupSizes = Object.values(GuideGroupSizes).map((size) => size.code);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);
const allowedWorkTermTypes = Object.values(WorkTermTypes).map((type) => type.code);

export const guidePriceRouter = Router()
  .post(
    '/guidePrice',
    body('guideType', `Guide Type must be one of: ${allowedGuideTypes}`)
      .isNumeric()
      .custom((type) => allowedGuideTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('groupSize', `Group size must be one of: ${allowedGuideGroupSizes}`)
      .isNumeric()
      .custom((type) => allowedGuideGroupSizes.includes(type)),
    body('workTermType', `Work Term type must be one of: ${allowedWorkTermTypes}`)
      .isNumeric()
      .custom((type) => allowedWorkTermTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { guideType, groupSize, seasonType, comfortLevel, workTermType, price } = req.body;
      await createGuidePriceAction(
        { guideType, groupSize, seasonType, comfortLevel, workTermType },
        price
      )
        .then(() => {
          guidePriceLogger.info('created new Guide price');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof GuidePriceAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            guidePriceLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/guidePrice', handleValidationErrors, (req, res) => {
    getAllGuideTypesPricesAction()
      .then((guidePrices) =>
        res.send(
          guidePrices.map(
            ({ id, guideType, groupSize, seasonType, comfortLevel, workTermType, price }) => ({
              id,
              guideType,
              groupSize,
              seasonType,
              comfortLevel,
              workTermType,
              price,
            })
          )
        )
      )
      .catch((err) => {
        guidePriceLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/guidePrice/:id',
    param('id', `It should be Guide price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getGuidePriceByIdAction(id)
        .then((guidePrice) => {
          if (guidePrice)
            res.send({
              id: guidePrice.id,
              guideType: guidePrice.guideType,
              groupSize: guidePrice.groupSize,
              seasonType: guidePrice.seasonType,
              comfortLevel: guidePrice.comfortLevel,
              workTermType: guidePrice.workTermType,
              price: guidePrice.price,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          guidePriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/guidePrice/:id',
    param('id', `It should be Guide price id here`).isMongoId(),
    body('guideType', `Guide Type must be one of: ${allowedGuideTypes}`)
      .isNumeric()
      .custom((type) => allowedGuideTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('groupSize', `Group size must be one of: ${allowedGuideGroupSizes}`)
      .isNumeric()
      .custom((type) => allowedGuideGroupSizes.includes(type)),
    body('workTermType', `Work Term type must be one of: ${allowedWorkTermTypes}`)
      .isNumeric()
      .custom((type) => allowedWorkTermTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { guideType, groupSize, seasonType, comfortLevel, workTermType, price } = req.body;
      await updateGuidePriceAction(id, {
        guideType,
        groupSize,
        seasonType,
        comfortLevel,
        workTermType,
        price,
      })
        .then((updatedGuidePrice) => {
          guidePriceLogger.info('updated Guide price with id ', updatedGuidePrice.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          guidePriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/guidePrice/:id',
    param('id', `It should be Guide price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteGuidePriceAction(id)
        .then((deletedGuidePrice) => {
          guidePriceLogger.info('deleted Guide price with id ', deletedGuidePrice.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          guidePriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
