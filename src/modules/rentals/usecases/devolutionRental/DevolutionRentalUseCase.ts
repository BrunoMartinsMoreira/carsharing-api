import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/datePovider/IDateProvider';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepositoty')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, userId }: IRequest): Promise<void> {
    if (!id) {
      throw new AppError('Rental id is required');
    }
    const rental = await this.rentalsRepository.findRentalById(id);
    const dateNow = this.dateProvider.dateNow();

    if (!rental) {
      throw new AppError('Rental does not exists');
    }

    const { user_id, car_id, start_date, expected_return_date } = rental;

    const car = await this.carsRepository.findByCarId(car_id);

    const { fine_amount, daily_rate } = car;

    if (user_id !== userId) {
      throw new AppError('Only user responsible for the rental can close it');
    }

    const daily = this.calculateRentalDurationInDays(start_date, dateNow);

    const mulcValue = this.calculateMulctValue(
      expected_return_date,
      dateNow,
      fine_amount,
    );

    const totalRentalCost = this.calculateRentalCost(
      daily,
      daily_rate,
      mulcValue,
    );

    const finishRentalObj = {
      id,
      total: totalRentalCost,
      active: false,
      end_date: this.dateProvider.dateNow(),
    };

    await this.rentalsRepository.finishRental(finishRentalObj);
    await this.carsRepository.updateAvalabilityStatus(car.id, true);
  }

  private calculateRentalDurationInDays(
    start_date: Date,
    dateNow: Date,
  ): number {
    const minimum_daily = 1;
    let daily = this.dateProvider.compareInDays(start_date, dateNow);

    if (daily < 1) {
      daily = minimum_daily;
    }

    return daily;
  }

  private calculateMulctValue(
    expected_return_date: Date,
    dateNow: Date,
    fine_amount: number,
  ): number {
    let mulct = 0;

    const delay = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (delay > 0) {
      mulct = delay * fine_amount;
    }

    return mulct;
  }

  private calculateRentalCost(
    daily: number,
    daily_rate: number,
    mulct: number,
  ): number {
    const totalCost = daily * daily_rate + mulct;
    return totalCost;
  }
}

export { DevolutionRentalUseCase };
