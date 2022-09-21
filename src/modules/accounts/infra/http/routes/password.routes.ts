import { Router } from 'express';
import { ResetPasswordController } from '../../../useCases/resetPassword/ResetPasswordController';
import { SendForgotPasswordMailController } from '../../../useCases/senForgotPasswordMail/SendForgotPasswordMailController';

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

const passwordRoutes = Router();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
