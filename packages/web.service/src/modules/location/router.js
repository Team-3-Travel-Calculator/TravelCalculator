import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { Regions } from '../region';
import {
  createLocationAction,
  deleteLocationAction,
  getAllLocationsAction,
  getLocationByIdAction,
  updateLocationAction,
} from './actions';
import { LocationAlreadyExistsError } from './errors';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../../assets'));
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const locationLogger = logger.getLogger('router.location');
const allowedRegions = Object.values(Regions);

export const locationRouter = Router()
  .post(
    '/location',
    upload.array('photo'),
    body('location', `Location should have a string type & has more than 2 symbols`)
      .isString()
      .isLength({ min: 2 }),
    body('region', `Region must be one of: ${allowedRegions}`)
      .isNumeric()
      .custom((region) => allowedRegions.includes(Number(region))),
    body('hoursToVisit', `Hours to visit should have a string type`)
      .isString()
      .isLength({ min: 1 }),
    body('photo'),
    handleValidationErrors,
    async (req, res) => {
      await createLocationAction(req)
        .then(() => {
          locationLogger.info('created new Location');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof LocationAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            locationLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/location', handleValidationErrors, (req, res) => {
    getAllLocationsAction()
      .then((locations) =>
        res.send(
          locations.map(({ id, location, region, hoursToVisit, photo }) => ({
            id,
            location,
            region,
            hoursToVisit,
            photo,
          }))
        )
      )
      .catch((err) => {
        locationLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/location/:id',
    param('id', `Incorrect Location id`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getLocationByIdAction(id)
        .then((location) => {
          if (location)
            res.send({
              id: location.id,
              location: location.location,
              region: location.region,
              hoursToVisit: location.hoursToVisit,
              photo: location.photo,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          locationLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/location/:id',
    upload.array('photo'),
    param('id', `Incorrect Location id`).isMongoId(),
    body('location', `Location should have a string type & has more than 2 symbols`)
      .isString()
      .isLength({ min: 2 }),
    body('region', `Region must be one of: ${allowedRegions}`)
      .isNumeric()
      .custom((region) => allowedRegions.includes(Number(region))),
    body('hoursToVisit', `Hours to visit should have a string type`)
      .isString()
      .isLength({ min: 1 }),
    body('photo'),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await updateLocationAction(id, req)
        .then((updatedLocation) => {
          locationLogger.info('updated Location with id ', updatedLocation.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          locationLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/location/:id',
    param('id', `Incorrect Location id`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteLocationAction(id)
        .then((deletedLocation) => {
          locationLogger.info('deleted Location with id ', deletedLocation.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          locationLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
