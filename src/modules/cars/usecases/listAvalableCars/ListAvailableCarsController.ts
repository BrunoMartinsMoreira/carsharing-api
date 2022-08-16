import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUseCase } from './ListCarsUseCase';

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id, brand, name } = req.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCarUseCase.execute({
      category_id: category_id as string,
      brand: brand as string,
      name: name as string,
    });

    return res.json(cars);
  }
}

export { ListAvailableCarsController };
