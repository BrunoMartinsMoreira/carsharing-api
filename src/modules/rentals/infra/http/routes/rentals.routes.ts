import { Router } from 'express';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateRentalController } from '../../../usecases/createRental/CreateRentalController';
import { DevolutionRentalController } from '../../../usecases/devolutionRental/DevolutionRentalController';
import { ListUserRentalsController } from '../../../usecases/listUserRentals/ListUserRentalsController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listUserRentalsController = new ListUserRentalsController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalsRoutes.put(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

rentalsRoutes.get(
  '/user-rentals',
  ensureAuthenticated,
  listUserRentalsController.handle,
);

export { rentalsRoutes };
