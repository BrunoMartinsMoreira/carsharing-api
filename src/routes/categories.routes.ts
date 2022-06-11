import { Router } from 'express';
import categoryController from '../controllers/CategoryController';

const categoriesRoutes = Router();

categoriesRoutes.post('/', categoryController.create);

categoriesRoutes.get('/', categoryController.list);
export { categoriesRoutes };
