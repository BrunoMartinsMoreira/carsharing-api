import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/datePovider/IDateProvider';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    private dateProvider: IDateProvider,
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

    // refatorar essa parte, deixar a data inicial dinamica
    const dateNow = this.dateProvider.dateNow();
    const rentDuration = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (rentDuration < 24) {
      throw new AppError('Rental duration must be at least 24 hours');
    }

    const return_date = new Date();

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date: return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
