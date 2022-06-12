import { Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { ListCategoryService } from '../services/ListCategoryService';

class CategoryController {
  private createCategoryService;
  private listCategoryService;
  constructor() {
    const categoriesRepository = new CategoriesRepository();
    this.createCategoryService = new CreateCategoryService(
      categoriesRepository,
    );
    this.listCategoryService = new ListCategoryService(categoriesRepository);
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      await this.createCategoryService.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const categories = await this.listCategoryService.execute();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CategoryController };
