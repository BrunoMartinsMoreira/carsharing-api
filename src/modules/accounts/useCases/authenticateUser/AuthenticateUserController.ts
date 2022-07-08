import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase,
      );

      const token = await authenticateUserUseCase.execute({ email, password });

      return res.status(200).json(token);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export { AuthenticateUserController };
