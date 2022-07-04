import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );
      await createSpecificationUseCase.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'Não foi possível criar uma nova spec' });
    }
  }
}

export { CreateSpecificationController };
