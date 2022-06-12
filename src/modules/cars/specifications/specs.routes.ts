import { Router } from 'express';
import { SpecificationsController } from './controllers/SpecificationsController';

const specificationsRoutes = Router();
const specificationsController = new SpecificationsController();

specificationsRoutes.post('/', specificationsController.create);

export { specificationsRoutes };
