import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      await this.createCategoryUseCase.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ message: 'Category already exists' });
    }
  }
}

export { CreateCategoryController };
