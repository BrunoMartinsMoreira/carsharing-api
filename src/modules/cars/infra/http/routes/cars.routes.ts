import { Router } from 'express';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCarController } from '../../../usecases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../usecases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '../../../usecases/listAvalableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.post(
  '/specifications/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
