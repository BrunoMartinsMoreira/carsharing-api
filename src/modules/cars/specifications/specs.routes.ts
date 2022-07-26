import { Router } from 'express';
import { ensureAuthenticated } from '../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from './useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
