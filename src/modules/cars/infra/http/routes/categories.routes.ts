import { Router } from 'express';
import multer from 'multer';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCategoryController } from '../../../usecases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../usecases/importCategories/ImportCategoryController';
import { ListCategoriesController } from '../../../usecases/ListCategory/ListCategoriesController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listCategoriesController.handle,
);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
