import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { PersonTypes } from '../personType';
import { SeasonTypes } from '../season';
import {
  createVisitServiceAction,
  deleteVisitServiceAction,
  getVisitServiceByIdAction,
  getVisitServicesAction,
  updateVisitServiceAction,
} from './actions';
import { OrderedLocationNotFoundError } from './errors';

const visitLogger = logger.getLogger('router.visit');
const allowedPersonTypes = Object.values(PersonTypes);
const allowedSeasonTypes = Object.values(SeasonTypes);

export const visitRouter = Router()
  .post(
    '/visit',
    body('client', `Incorrect Client id`).isMongoId(),
    body('visitors', `Visitors should be an array`).isArray(),
    body('visitors.*.orderedLocation', `Incorrect Ordered location id`).isMongoId(),
    body('visitors.*.personType', `Visitors person type should be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('visitors.*.count', `Visitors count should be a number`).isNumeric(),
    body('orderedSeasonType', `Ordered season type should be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    handleValidationErrors,
    async (req, res) => {
      const { client, visitors, orderedSeasonType } = req.body;
      await createVisitServiceAction(client, visitors, orderedSeasonType)
        .then(() => {
          visitLogger.info('created new Visit service');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof OrderedLocationNotFoundError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            visitLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/visit', handleValidationErrors, (req, res) => {
    getVisitServicesAction()
      .then((visitServices) =>
        res.send(
          visitServices.map(
            ({
              id,
              client,
              attendanceDate,
              visitors,
              orderedSeasonType,
              totalSpentHours,
              totalPrice,
            }) => ({
              id,
              client,
              attendanceDate,
              visitors,
              orderedSeasonType,
              totalSpentHours,
              totalPrice,
            })
          )
        )
      )
      .catch((err) => {
        visitLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/visit/:id',
    param('id', `Incorrect Visit service id`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getVisitServiceByIdAction(id)
        .then((visitService) => {
          if (visitService)
            res.send({
              id: visitService.id,
              client: visitService.client,
              attendanceDate: visitService.attendanceDate,
              visitors: visitService.visitors,
              orderedSeasonType: visitService.orderedSeasonType,
              totalSpentHours: visitService.totalSpentHours,
              totalPrice: visitService.totalPrice,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          visitLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/visit/:id',
    param('id', `Incorrect Visit service id`).isMongoId(),
    body('client', `Incorrect Client id`).isMongoId(),
    body('attendanceDate', `Attendance Date should be a string`).isString(),
    body('visitors', `Visitors should be an array`).isArray(),
    body('visitors.*.orderedLocation', `Incorrect Ordered location id`).isMongoId(),
    body('visitors.*.personType', `Visitors person type should be one of: ${allowedPersonTypes}`)
      .isNumeric()
      .custom((type) => allowedPersonTypes.includes(type)),
    body('visitors.*.count', `Visitors count should be a number`).isNumeric(),
    body('orderedSeasonType', `Ordered season type should be one of: ${allowedSeasonTypes}`)
      .isNumeric()
      .custom((type) => allowedSeasonTypes.includes(type)),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { client, attendanceDate, visitors, orderedSeasonType } = req.body;
      await updateVisitServiceAction(id, client, attendanceDate, visitors, orderedSeasonType)
        .then((updatedVisitService) => {
          visitLogger.info('updated Visit Service with id ', updatedVisitService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          visitLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/visit/:id',
    param('id', `Incorrect Visit service id`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteVisitServiceAction(id)
        .then((deletedVisitService) => {
          visitLogger.info('deleted Visit Service with id ', deletedVisitService.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          visitLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
