import { Router } from 'express';
import { authenticateRoutes } from '../../../modules/accounts/infra/http/routes/authenticate.routes';
import { usersRoutes } from '../../../modules/accounts/infra/http/routes/users.routes';
import { categoriesRoutes } from '../../../modules/cars/categories/infra/http/routes/categories.routes';
import { specificationsRoutes } from '../../../modules/cars/specifications/infra/http/routes/specs.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', authenticateRoutes);

export { routes };
