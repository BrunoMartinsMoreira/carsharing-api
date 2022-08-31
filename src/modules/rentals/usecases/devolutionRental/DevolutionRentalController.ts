import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const devolutionRentalUseCase = container.resolve(
        DevolutionRentalUseCase,
      );

      await devolutionRentalUseCase.execute({
        id,
        userId,
      });

      return res.status(200).json({ message: 'Rental ended successfully!' });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
}

export { DevolutionRentalController };
