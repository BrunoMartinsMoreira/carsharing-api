import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from './usecases/createCategory/CreateCategoryController';
import importCategoryController from './usecases/importCategories';
import listCategoriesController from './usecases/ListCategory';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController().handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController().handle(req, res);
});

export { categoriesRoutes };
