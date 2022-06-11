import { Request, Response } from 'express';
import categoriesRepository from '../repositories/CategoriesRepository';

class CategoryController {
  public async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const categoryExists = categoriesRepository.findByName(name);
    if (categoryExists) {
      return res.status(400).json({
        message: 'Category alrealdy exists',
      });
    }

    categoriesRepository.create({
      name,
      description,
    });
    return res.status(201).send();
  }

  public async list(req: Request, res: Response) {
    const categories = categoriesRepository.list();
    return res.json(categories);
  }
}

export default new CategoryController();
