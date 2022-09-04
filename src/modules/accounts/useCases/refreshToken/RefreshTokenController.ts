/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const token =
        req.headers['x-access-token'] || 
        req.body.token || 
        req.query.token;

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

      const refresh_token = await refreshTokenUseCase.execute(token);
      return res.status(200).json(refresh_token);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}

export { RefreshTokenController };
