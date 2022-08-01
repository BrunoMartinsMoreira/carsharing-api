import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  licence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlrealdyExists = await this.carsRepository.findByLicencePlate(
      licence_plate,
    );

    if (carAlrealdyExists) {
      throw new AppError(
        'There is already a car registered with this license plate',
      );
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
