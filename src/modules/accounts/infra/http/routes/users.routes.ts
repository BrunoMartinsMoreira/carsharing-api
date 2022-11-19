import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateUserController } from '../../../useCases/createUser/CreateUserController';
import { ProfileUserController } from '../../../useCases/profileUser/ProfileUserController';
import { UpdateUserAvatarController } from '../../../useCases/updateUserAvatar/UpdateUserAvatarController';

const createUserController = new CreateUserController();
const upadateAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/profile', profileUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  upadateAvatarController.handle,
);

export { usersRoutes };
