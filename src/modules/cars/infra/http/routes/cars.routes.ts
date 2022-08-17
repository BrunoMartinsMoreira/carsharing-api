import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCarController } from '../../../usecases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../usecases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '../../../usecases/listAvalableCars/ListAvailableCarsController';
import { UploadCarImageController } from '../../../usecases/uploadCarImage/UploadCarImageController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadCarImgs = multer(uploadConfig.upload('./tmp/cars'));

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

carsRoutes.post(
  '/images/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImgs.array('images'),
  uploadCarImageController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
