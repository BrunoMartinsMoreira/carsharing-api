import { Router } from 'express';
import { usersRoutes } from './modules/accounts/users.routes';
import { categoriesRoutes } from './modules/cars/categories/categories.routes';
import { specificationsRoutes } from './modules/cars/specifications/specs.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);

export { routes };
