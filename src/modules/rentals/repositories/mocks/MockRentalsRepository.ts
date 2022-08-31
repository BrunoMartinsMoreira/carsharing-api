import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IFinishRental, IRentalsRepository } from '../IRentalsRepository';

class MockRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      active: true,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findActiveByUserId(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      r => r.user_id === user_id && r.active === true,
    );
    return rental;
  }

  async findRentalById(id: string): Promise<Rental> {
    const rental = this.rentals.find(r => r.id === id);
    return rental;
  }

  async finishRental(data: IFinishRental): Promise<void> {
    const { id, total, active, end_date } = data;

    const rental = await this.findRentalById(id);

    Object.assign(rental, {
      total,
      active,
      end_date,
    });

    this.rentals.push(rental);
  }

  async listRentalsByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter(rental => rental.user_id === user_id);
    return rentals;
  }
}

export { MockRentalsRepository };
