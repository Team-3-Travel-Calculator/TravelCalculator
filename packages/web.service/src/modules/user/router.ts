import type { Request, Response } from 'express';
import { Router } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { errorHandler } from '../../services/errorhandler';
import { createNewUser, ifUserFound, isNumberRole } from './actions';

const userLogger = logger.getLogger('router.user');

export const serverError = `Sorry, this is not working properly. We now know about this mistake and working to fix it.`;

export const userRouter = Router().post(
  '/user',
  body('email').isEmail().withMessage(`please enter the correct email`),
  body('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
  body('role').custom(isNumberRole).withMessage('the specified role was not found'),
  errorHandler,
  async (req: Request, res: Response) => {
    if (await ifUserFound(req.body.email)) return res.send('this user was previously registered');
    return createNewUser(req.body.email, req.body.password, req.body.role)
      .then(async (user) => {
        await user.save();
        return res.status(StatusCodes.CREATED).send('user created successfully');
      })
      .catch((_err) => {
        userLogger.error(`Server error in router POST  /user`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: serverError,
        });
      });
  }
);
