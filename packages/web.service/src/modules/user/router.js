import { Router } from 'express';
import { body, param, query } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import {
  createUserAction,
  getAllUsersAction,
  getUserByEmailAction,
  logoutUserAction,
} from './actions';
import { EmailAlreadyExistsError } from './errors.ts';
import { UserRoles } from './schema';

const userLogger = logger.getLogger('router.user');

const allowedRoles = [UserRoles.Admin, UserRoles.Manager];

export const userRouter = Router()
  .post('/user/logout', (req, res) => {
    const { id } = req.user;
    logoutUserAction(id)
      .then(() => {
        res.send();
      })
      .catch((err) => {
        userLogger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      });
  })
  .post(
    '/user',
    body('email', 'Email is invalid').isEmail(),
    body('password', 'Password must be longer than 8 characters').isString().isLength({ min: 8 }),
    body('role', `Role must be one of: ${allowedRoles}`)
      .isNumeric()
      .custom((role) => allowedRoles.includes(role)),
    handleValidationErrors,
    async (req, res) => {
      const { email, password, role } = req.body;
      await createUserAction(email, password, role)
        .then((user) => {
          userLogger.info('created new user:', user.email);
          res.status(StatusCodes.CREATED).send();
        })
        .catch((err) => {
          if (err instanceof EmailAlreadyExistsError) {
            res.status(StatusCodes.CONFLICT).send(new createError.Conflict(err.message));
          } else {
            userLogger.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
          }
        });
    }
  )
  .get(
    '/user',
    query('size', 'Size must be at 1 to 30 ').toInt().isInt({ gt: 0, lt: 31 }),
    query('page', 'Page not found').toInt().notEmpty(),
    handleValidationErrors,
    (req, res) => {
      const { page, size } = req.query;
      getAllUsersAction(Number(page), Number(size))
        .then((users) => res.send(users.map(({ email, role }) => ({ email, role }))))
        .catch((err) => {
          userLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  )
  .get(
    '/user/:email',
    param('email', 'Email is invalid').isEmail(),
    handleValidationErrors,
    async (req, res) => {
      const { email } = req.params;
      await getUserByEmailAction(email)
        .then((user) => {
          if (user) res.send({ email: user.email, role: user.role });
          else res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound());
        })
        .catch((err) => {
          userLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        });
    }
  );
