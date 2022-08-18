import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class MockRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    start_date,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      start_date,
      end_date,
      expected_return_date,
      total,
    });

    this.rentals.push(rental);

    return rental;
  }
}

export { MockRentalsRepository };
