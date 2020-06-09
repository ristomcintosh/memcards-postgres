import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ClientError from '../utils/clientError';

require('dotenv').config();

export default function Auth(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.webToken;
  const userId: string = req.query.userId as string;
  if (!token)
    return next(new ClientError('Access denied. No token provided.', 401));
  if (!userId) return next(new ClientError('No userId provided', 400));

  try {
    type JWTObj = { id: string | number };
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JWTObj;
    const userIdMatch = decoded.id == userId;
    return userIdMatch ? next() : new ClientError('Forbidden', 403);
  } catch (e) {
    return next(new ClientError('Invalid token', 400));
  }
}
