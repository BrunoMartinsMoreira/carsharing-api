import { Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

class CategoryController {
  private createCategoryService;
  constructor() {
    const categoriesRepository = new CategoriesRepository();
    this.createCategoryService = new CreateCategoryService(
      categoriesRepository,
    );
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      this.createCategoryService.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /* public async list(req: Request, res: Response) {
    const categories = categoriesRepository.list();
    return res.json(categories);
  } */
}

export { CategoryController };
