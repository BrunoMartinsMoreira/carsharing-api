import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, password, email, driver_licence } = req.body;
      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({
        name,
        password,
        email,
        driver_licence,
      });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ message: 'Unknow error' });
    }
  }
}

export { CreateUserController };
