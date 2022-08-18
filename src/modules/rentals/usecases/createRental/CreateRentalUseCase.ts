import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: string;
}

// @injectable()
class CreateRentalUseCase {
  constructor(
    // @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    // @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const chosenCar = await this.carsRepository.findByCarId(car_id);

    if (!chosenCar.available) {
      throw new AppError('Car not available');
    }

    const haveUserAnActiveRental =
      await this.rentalsRepository.findActiveByUserId(user_id);

    if (haveUserAnActiveRental) {
      throw new AppError('user already has an active rent');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
