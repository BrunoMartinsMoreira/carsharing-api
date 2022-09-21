import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { password } = req.body;
    const { token } = req.query;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
    await resetPasswordUseCase.execute({ token: String(token), password });

    return res.status(200).json({
      message: 'Password updated',
    });
  }
}

export { ResetPasswordController };
