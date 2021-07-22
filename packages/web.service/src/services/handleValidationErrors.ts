import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export const handleValidationErrors: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else {
    const [errorToBeSent] = errors.array({ onlyFirstError: true });
    res.status(StatusCodes.BAD_REQUEST).send(new createError.BadRequest(errorToBeSent.msg));
  }
};
