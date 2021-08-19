import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { ComfortLevels } from '../comfortLevel';
import { HotelTypes, RoomTypes } from '../hotelType';
import { PersonsNumbers } from '../personsNumber';
import { SeasonTypes } from '../season';
import {
  createHotelServiceAction,
  deleteHotelServiceAction,
  getAllHotelServicesAction,
  getHotelServiceByIdAction,
  updateHotelServiceAction,
} from './actions';
import { RoomsNumberNotMatchToPersonsError } from './errors';

const hotelLogger = logger.getLogger('router.hotel');

const allowedPersonsNumber = Object.values(PersonsNumbers);
const allowedHotelTypes = Object.values(HotelTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);
const allowedComfortLevels = Object.values(ComfortLevels);
const allowedRoomTypes = Object.values(RoomTypes);

export const hotelRouter = Router()
  .post(
    '/hotel',
    body('client', `Client field should have an id`).isMongoId(),
    body('personsNumber', `Persons Number should be one of: ${allowedPersonsNumber}`)
      .isNumeric()
      .custom((number) => allowedPersonsNumber.includes(number)),
    body('hotelType', `Hotel type should be one of: ${allowedHotelTypes}`)
      .isNumeric()
      .custom((type) => allowedHotelTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    handleValidationErrors,
    async (req, res) => {
      const { client, personsNumber, hotelType, seasonType, comfortLevel } = req.body;
      await createHotelServiceAction(client, {
        personsNumber,
        hotelType,
        seasonType,
        comfortLevel,
      })
        .then(() => {
          hotelLogger.info('created new Hotel service');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          hotelLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .get('/hotel', handleValidationErrors, (req, res) => {
    getAllHotelServicesAction()
      .then((hotelServices) =>
        res.send(
          hotelServices.map(
            ({
              id,
              client,
              stayDate,
              personsNumber,
              hotelType,
              seasonType,
              comfortLevel,
              rooms,
              totalPrice,
            }) => ({
              id,
              client,
              stayDate,
              personsNumber,
              hotelType,
              seasonType,
              comfortLevel,
              rooms,
              totalPrice,
            })
          )
        )
      )
      .catch((err) => {
        hotelLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/hotel/:id',
    param('id', `It should be Hotel service id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getHotelServiceByIdAction(id)
        .then((hotelService) => {
          if (hotelService)
            res.send({
              id: hotelService.id,
              client: hotelService.client,
              stayDate: hotelService.stayDate,
              personsNumber: hotelService.personsNumber,
              hotelType: hotelService.hotelType,
              seasonType: hotelService.seasonType,
              comfortLevel: hotelService.comfortLevel,
              rooms: hotelService.rooms,
              totalPrice: hotelService.totalPrice,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          hotelLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/hotel/:id',
    param('id', `It should be Hotel service id here`).isMongoId(),
    body('client', `Client field should have an id`).isMongoId(),
    body('stayDate', `Stay date should be a string`).isString(),
    body('personsNumber', `Persons number should be one of: ${allowedPersonsNumber}`)
      .isNumeric()
      .custom((number) => allowedPersonsNumber.includes(number)),
    body('hotelType', `Hotel type should be one of: ${allowedHotelTypes}`)
      .isNumeric()
      .custom((type) => allowedHotelTypes.includes(type)),
    body('seasonType', `Season must be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    body('comfortLevel', `Comfort level must be one of: ${allowedComfortLevels}`)
      .isNumeric()
      .custom((level) => allowedComfortLevels.includes(level)),
    body('rooms', `Rooms field should be an array`).isArray(),
    body('rooms.*.type', ` Rooms type should be one of: ${allowedRoomTypes}`)
      .isNumeric()
      .custom((type) => allowedRoomTypes.includes(type)),
    body('rooms.*.number', `Rooms number should have number format`).isNumeric(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { client, stayDate, personsNumber, hotelType, seasonType, comfortLevel, rooms } =
        req.body;
      await updateHotelServiceAction(
        id,
        client,
        stayDate,
        {
          personsNumber,
          hotelType,
          seasonType,
          comfortLevel,
        },
        rooms
      )
        .then((updatedHotelService) => {
          hotelLogger.info('updated Hotel service with id: ', updatedHotelService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          if (err instanceof RoomsNumberNotMatchToPersonsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            hotelLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .delete(
    '/hotel/:id',
    param('id', `It should be Hotel service id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteHotelServiceAction(id)
        .then((deletedHotelService) => {
          hotelLogger.info('deleted Hotel service with id: ', deletedHotelService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          hotelLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
