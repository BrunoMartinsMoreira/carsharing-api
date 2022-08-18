import { getRepository, Repository } from 'typeorm';
import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    start_date,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      start_date,
      end_date,
      expected_return_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
