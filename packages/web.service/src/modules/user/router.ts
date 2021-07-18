import type { Request, Response } from 'express';
import { Router } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import { logger } from '../../logger';
import { errorHandler } from '../../services/errorHandler';
import { encryptPassword, generateToken, ifUserFound, isNumberRole } from './actions';
import { UserModel } from './schema';

const userLogger = logger.getLogger('router.user');

export const serverError = `Sorry, this is not working properly. We now know about this mistake and working to fix it.`;

export const userRouter = Router().post(
  '/user',
  body('email').isEmail().withMessage(`please enter the correct email`),
  body('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
  body('role').custom(isNumberRole).withMessage('the specified role was not found'),
  errorHandler,
  async (req: Request, res: Response) => {
    const userExists = await ifUserFound(req.body.email);
    if (userExists) {
      return res.send('user with the given email already exists');
    }
    return UserModel.create({
      ...req.body,
      token: generateToken(),
      password: await encryptPassword(req.body.password),
      role: req.body.role,
    })
      .then(async (user) => {
        await user.save();
        return res.status(StatusCodes.OK).send('user created successfully');
      })
      .catch((_err) => {
        userLogger.debug(`Server error in router POST  /user`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: serverError,
        });
      });
  }
);
