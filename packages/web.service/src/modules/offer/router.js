import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { PersonsNumbers } from '../personsNumber';
import {
  createOfferAction,
  deleteOfferAction,
  getAllOffersAction,
  getOfferByIdAction,
  updateOfferAction,
} from './actions';

const offerLogger = logger.getLogger('router.offer');

const allowedPersonsNumbers = Object.values(PersonsNumbers);

export const offerRouter = Router()
  .post(
    '/offer',
    body('client', `Client field should have an id`).isMongoId(),
    body('offerAuthor', `Offer author should be a string`).isString().isLength({ min: 2 }),
    body('tourPeriod', `Tour period should be an array of strings`).isArray(),
    body('personsNumber', ` Persons number must be one of: ${allowedPersonsNumbers}`)
      .isNumeric()
      .custom((person) => allowedPersonsNumbers.includes(person)),
    body('tourProgram', `Tour program should be an object`).isObject(),
    body(
      'tourProgram.name',
      `Tour program name should be a string with length more than 2 characters`
    )
      .isString()
      .isLength({ min: 2 }),
    body('conditions', `Conditions should be a string`).isString(),
    handleValidationErrors,
    async (req, res) => {
      const { client, offerAuthor, tourPeriod, personsNumber, tourProgram, conditions } = req.body;
      await createOfferAction(
        client,
        {
          personsNumber,
          offerAuthor,
          tourPeriod,
          tourProgram,
        },
        conditions
      )
        .then(() => {
          offerLogger.info('created new Offer');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          offerLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .get('/offer', handleValidationErrors, (req, res) => {
    getAllOffersAction()
      .then((offers) =>
        res.send(
          offers.map(
            ({
              id,
              client,
              orderId,
              calculationDate,
              personsNumber,
              offerAuthor,
              tourPeriod,
              tourProgram,
              conditions,
              totalPrice,
            }) => ({
              id,
              client,
              orderId,
              calculationDate,
              personsNumber,
              offerAuthor,
              tourPeriod,
              tourProgram,
              conditions,
              totalPrice,
            })
          )
        )
      )
      .catch((err) => {
        offerLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/offer/:id',
    param('id', `Incorrect Offer id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getOfferByIdAction(id)
        .then((offer) => {
          if (offer)
            res.send({
              id: offer.id,
              client: offer.client,
              orderId: offer.orderId,
              calculationDate: offer.calculationDate,
              personsNumber: offer.personsNumber,
              offerAuthor: offer.offerAuthor,
              tourPeriod: offer.tourPeriod,
              tourProgram: offer.tourProgram,
              conditions: offer.conditions,
              totalPrice: offer.totalPrice,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          offerLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/offer/:id',
    param('id', `It should be Hotel service id here`).isMongoId(),
    body('client', `Client field should have an id`).isMongoId(),
    body('calculationDate', `Calculation date should be a string`).isString(),
    body('orderId', `OrderId should be a number type`).isNumeric(),
    body('offerAuthor', `Offer author should be a string`).isString().isLength({ min: 2 }),
    body('tourPeriod', `Tour period should be an array of strings`).isArray(),
    body('personsNumber', ` Persons number must be one of: ${allowedPersonsNumbers}`)
      .isNumeric()
      .custom((person) => allowedPersonsNumbers.includes(person)),
    body('tourProgram', `Tour program should be an object`).isObject(),
    body(
      'tourProgram.name',
      `Tour program name should be a string with length more than 2 characters`
    )
      .isString()
      .isLength({ min: 2 }),
    body('conditions', `Conditions should be a string`).isString(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const {
        client,
        orderId,
        calculationDate,
        personsNumber,
        offerAuthor,
        tourPeriod,
        tourProgram,
        conditions,
      } = req.body;
      await updateOfferAction(
        id,
        client,
        orderId,
        { calculationDate, personsNumber, offerAuthor, tourPeriod, tourProgram },
        conditions
      )
        .then((updatedOffer) => {
          offerLogger.info('updated Offer with id: ', updatedOffer.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          offerLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/offer/:id',
    param('id', `Incorrect Offer id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteOfferAction(id)
        .then((deletedOffer) => {
          offerLogger.info('deleted Offer with id: ', deletedOffer.id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          offerLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
