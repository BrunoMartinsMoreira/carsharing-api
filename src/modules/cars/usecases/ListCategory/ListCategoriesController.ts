import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
      const categories = await listCategoriesUseCase.execute();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).send({ message: 'Not categories found' });
    }
  }
}

export { ListCategoriesController };
