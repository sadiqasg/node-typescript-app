/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`${req.url} was visited!`);
  next();
};
