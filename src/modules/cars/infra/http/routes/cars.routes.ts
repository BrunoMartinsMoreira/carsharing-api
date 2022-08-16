import { Router } from 'express';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCarController } from '../../../usecases/createCar/CreateCarController';
import { ListAvailableCarsController } from '../../../usecases/listAvalableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
