import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ClientError from '../utils/clientError';

require('dotenv').config();

export default function Auth(req: Request, res: Response, next: NextFunction) {
  let token: string | null = null;
  if (req.headers.authorization) {
    const authorizationString = req.headers.authorization.split(' ');
    token = authorizationString[1];
  }
  if (!token)
    return next(new ClientError('Access denied. No token provided.', 401));

  try {
    type JWTObj = { id: string | number };
    jwt.verify(token, process.env.JWT_SECRET || '') as JWTObj;
    next();
  } catch (e) {
    return next(new ClientError('Invalid token', 400));
  }
}
