import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  const { JWT_SECRET_KEY } = process.env;

  if (!authHeader) {
    throw new AppError('Invalid token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, JWT_SECRET_KEY) as IPayload;

    if (!user_id) {
      throw new AppError('Invalid token');
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
