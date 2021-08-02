import { Router } from 'express';
import { body } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { handleValidationErrors } from '../../services/handleValidationErrors';
import { loginUserAction } from './actions';
import { IncorrectPasswordError, UserNotFoundError } from './errors.ts';

const authLogger = logger.getLogger('router.auth');

export const authRouter = Router().post(
  '/auth/login',
  body('email', 'Email is invalid').isEmail(),
  body('password', 'Password must be longer than 8 characters').isString().isLength({ min: 8 }),
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;
    await loginUserAction(email, password)
      .then((token) => res.json(token))
      .catch((err) => {
        if (err instanceof UserNotFoundError) {
          res.status(StatusCodes.NOT_FOUND).send(new createError.NotFound(err.message));
        } else if (err instanceof IncorrectPasswordError) {
          res.status(StatusCodes.UNAUTHORIZED).send(new createError.Unauthorized(err.message));
        } else {
          authLogger.error(err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
      });
  }
);
