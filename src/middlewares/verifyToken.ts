import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const tokenSecret: string = process.env.TOKEN_SECRET || '';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.auth_token;
    jwt.verify(token, tokenSecret);
  } catch (error) {
    return res.json(error);
  }
  next();
};
