import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserRentalsUseCase } from './ListUserRentalsUseCase';

class ListUserRentalsController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id: user_id } = req.user;
      const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase);
      const rentals = await listUserRentalsUseCase.execute(user_id);
      return res.status(200).json(rentals);
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
}

export { ListUserRentalsController };
