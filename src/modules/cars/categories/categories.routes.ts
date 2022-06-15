import { Router } from 'express';
import { createCategoryController } from './usecases/createCategory';
import { listCategoriesController } from './usecases/ListCategory';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) =>
  createCategoryController.handle(req, res),
);

categoriesRoutes.get('/', (req, res) =>
  listCategoriesController.handle(req, res),
);

export { categoriesRoutes };
