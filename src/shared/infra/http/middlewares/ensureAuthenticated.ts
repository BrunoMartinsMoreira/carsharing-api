import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
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
  const userTokensRepository = new UsersTokensRepository();

  const { REFRESH_TOKEN_SECRET_KEY } = process.env;

  if (!authHeader) {
    throw new AppError('Invalid token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      String(REFRESH_TOKEN_SECRET_KEY),
    ) as IPayload;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

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
