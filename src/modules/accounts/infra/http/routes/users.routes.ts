import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateUserController } from '../../../useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../useCases/updateUserAvatar/UpdateUserAvatarController';

const createUserController = new CreateUserController();
const upadateAvatarController = new UpdateUserAvatarController();

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  upadateAvatarController.handle,
);

export { usersRoutes };
