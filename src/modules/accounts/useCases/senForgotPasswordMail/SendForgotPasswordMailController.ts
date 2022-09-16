import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const setForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    );

    await setForgotPasswordMailUseCase.execute(email);

    return res.status(200);
  }
}

export { SendForgotPasswordMailController };
