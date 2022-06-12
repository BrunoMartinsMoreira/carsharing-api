import { Router } from 'express';
import { categoriesRoutes } from './modules/cars/categories/categories.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);

export { routes };
