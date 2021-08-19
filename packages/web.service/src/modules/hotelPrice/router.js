import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { ComfortLevels } from '../comfortLevel';
import { HotelTypes, RoomTypes } from '../hotelType';
import { SeasonTypes } from '../season';
import {
  createHotelPriceAction,
  deleteHotelPriceAction,
  getAllHotelTypesPricesAction,
  getHotelPriceByIdAction,
  updateHotelPriceAction,
} from './actions';
import { HotelPriceAlreadyExistsError } from './errors';

const hotelPriceLogger = logger.getLogger('router.hotelPrice');

const allowedHotelTypes = Object.values(HotelTypes);
const allowedRoomTypes = Object.values(RoomTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);

export const hotelPriceRouter = Router()
  .post(
    '/hotelPrice',
    body('hotelType', `Hotel type must be one of: ${allowedHotelTypes}`)
      .isNumeric()
      .custom((type) => allowedHotelTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('roomType', `Room type must be one of: ${allowedRoomTypes}`)
      .isNumeric()
      .custom((type) => allowedRoomTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { hotelType, roomType, seasonType, comfortLevel, price } = req.body;
      await createHotelPriceAction(hotelType, roomType, seasonType, comfortLevel, price)
        .then(() => {
          hotelPriceLogger.info('created new Hotel price service');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof HotelPriceAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            hotelPriceLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/hotelPrice', handleValidationErrors, (req, res) => {
    getAllHotelTypesPricesAction()
      .then((hotelPrices) =>
        res.send(
          hotelPrices.map(({ id, hotelType, roomType, seasonType, comfortLevel, price }) => ({
            id,
            hotelType,
            roomType,
            seasonType,
            comfortLevel,
            price,
          }))
        )
      )
      .catch((err) => {
        hotelPriceLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/hotelPrice/:id',
    param('id', `It should be Hotel price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getHotelPriceByIdAction(id)
        .then((hotelPrice) => {
          if (hotelPrice)
            res.send({
              id: hotelPrice.id,
              hotelType: hotelPrice.hotelType,
              roomType: hotelPrice.roomType,
              seasonType: hotelPrice.seasonType,
              comfortLevel: hotelPrice.comfortLevel,
              price: hotelPrice.price,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          hotelPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/hotelPrice/:id',
    param('id', `It should be Hotel price id here`).isMongoId(),
    body('hotelType', `Hotel type must be one of: ${allowedHotelTypes}`)
      .isNumeric()
      .custom((type) => allowedHotelTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('roomType', `Room type must be one of: ${allowedRoomTypes}`)
      .isNumeric()
      .custom((type) => allowedHotelTypes.includes(type)),
    body('price', `Price should be a string`).isString().isLength({ min: 1 }),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { hotelType, roomType, seasonType, comfortLevel, price } = req.body;
      await updateHotelPriceAction(id, {
        hotelType,
        roomType,
        seasonType,
        comfortLevel,
        price,
      })
        .then((updatedHotelPrice) => {
          hotelPriceLogger.info('updated Hotel price with id ', updatedHotelPrice.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          hotelPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/hotelPrice/:id',
    param('id', `It should be Hotel price id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteHotelPriceAction(id)
        .then((deletedHotelPrice) => {
          hotelPriceLogger.info('deleted Hotel price with id ', deletedHotelPrice.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          hotelPriceLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
