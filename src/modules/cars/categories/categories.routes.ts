import { Router } from 'express';
import multer from 'multer';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { CreateCategoryController } from './usecases/createCategory/CreateCategoryController';
import { ImportCategoryController } from './usecases/importCategories/ImportCategoryController';
import { ListCategoriesController } from './usecases/ListCategory/ListCategoriesController';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesControlle = new ListCategoriesController();

categoriesRoutes.use(ensureAuthenticated);

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesControlle.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
