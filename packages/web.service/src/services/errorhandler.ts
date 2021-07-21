import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
};
