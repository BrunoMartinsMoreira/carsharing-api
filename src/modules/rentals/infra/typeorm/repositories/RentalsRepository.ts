import { getRepository, Repository } from 'typeorm';
import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import {
  IFinishRental,
  IRentalsRepository,
} from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      active: true,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findActiveByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, active: true },
    });
    return rental;
  }

  async findRentalById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: id });
    return rental;
  }

  async finishRental(data: IFinishRental): Promise<void> {
    const { id, total, active, end_date } = data;
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ total, active, end_date })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }

  async listRentalsByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rentals;
  }
}

export { RentalsRepository };
