import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
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

  if (!authHeader) {
    throw new AppError('Invalid token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      String(process.env.JWT_SECRET_KEY),
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
