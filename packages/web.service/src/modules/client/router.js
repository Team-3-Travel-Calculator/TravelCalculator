import { Router } from 'express';
import { body, param } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import countries from 'i18n-iso-countries';
import ISO6391 from 'iso-639-1';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import {
  createClientAction,
  deleteClientAction,
  getAllClientsAction,
  getClientByIdAction,
  updateClientDataAction,
} from './actions';
import { ClientAlreadyExistsError } from './errors';
import { ClientTypes } from './schema';

const clientLogger = logger.getLogger('router.client');

const allowedCountries = Object.keys(countries.getAlpha2Codes());
const allowedLanguages = ISO6391.getAllCodes();
const allowedClientTypes = Object.values(ClientTypes);

export const clientRouter = Router()
  .post(
    '/client',
    body('type', ` Client type must be one of: ${allowedClientTypes}`)
      .isNumeric()
      .custom((type) => allowedClientTypes.includes(type)),
    body('country', `Country must be one of: ${allowedCountries}`)
      .isString()
      .isLength({ max: 2 })
      .custom((countryCode) => allowedCountries.includes(countryCode)),
    body('email', 'Email is invalid').isEmail(),
    body('phone', `The phone number must contain at least 10 characters`)
      .isString()
      .isLength({ min: 10 }),
    body('language', `Language must be one of: ${allowedLanguages}`)
      .isString()
      .isLength({ max: 2 })
      .custom((languageCode) => allowedLanguages.includes(languageCode)),
    body('name', `Name should be entered`).isString().isLength({ min: 2 }),
    handleValidationErrors,
    async (req, res) => {
      const { type, country, email, phone, language, name } = req.body;
      await createClientAction({ type, country, email, phone, language, name })
        .then(() => {
          clientLogger.info('created new client');
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof ClientAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            clientLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get('/client', handleValidationErrors, (req, res) => {
    getAllClientsAction()
      .then((clients) =>
        res.send(
          clients.map(({ id, type, country, email, phone, language, fullName, companyName }) => ({
            id,
            type,
            country,
            email,
            phone,
            language,
            name: fullName || companyName,
          }))
        )
      )
      .catch((err) => {
        clientLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .get(
    '/client/:id',
    param('id', `It should be client id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await getClientByIdAction(id)
        .then((client) => {
          if (client)
            res.send({
              id: client.id,
              type: client.type,
              email: client.email,
              country: client.country,
              phone: client.phone,
              language: client.language,
              name: client.fullName || client.companyName,
            });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          clientLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .put(
    '/client/:id',
    param('id', `It should be client id here`).isMongoId(),
    body('country', `Country must be one of: ${allowedCountries}`)
      .isString()
      .isLength({ max: 2 })
      .custom((countryCode) => allowedCountries.includes(countryCode)),
    body('email', 'Email is invalid').isEmail(),
    body('phone', `The phone number must contain at least 10 characters`)
      .isString()
      .isLength({ min: 10 }),
    body('language', `Language must be one of: ${allowedLanguages}`)
      .isString()
      .isLength({ max: 2 })
      .custom((languageCode) => allowedLanguages.includes(languageCode)),
    body('name', `Name should be entered`).isString().isLength({ min: 2 }),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      const { country, email, phone, language, name } = req.body;
      await updateClientDataAction(id, { country, email, phone, language, name })
        .then((updatedClient) => {
          clientLogger.info('updated client:', updatedClient.fullName || updatedClient.companyName);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          clientLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .delete(
    '/client/:id',
    param('id', `It should be client id here`).isMongoId(),
    handleValidationErrors,
    async (req, res) => {
      const { id } = req.params;
      await deleteClientAction(id)
        .then(() => {
          clientLogger.info('deleted client:', id);
          res.status(StatusCodes.OK).send();
        })
        .catch((err) => {
          clientLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
