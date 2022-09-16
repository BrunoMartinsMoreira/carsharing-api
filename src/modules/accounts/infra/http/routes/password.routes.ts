import { Router } from 'express';
import { SendForgotPasswordMailController } from '../../../useCases/senForgotPasswordMail/SendForgotPasswordMailController';

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

const passwordRoutes = Router();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export { passwordRoutes };
