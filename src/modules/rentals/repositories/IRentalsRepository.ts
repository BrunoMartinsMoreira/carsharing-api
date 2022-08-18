import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    start_date,
    end_date,
    expected_return_date,
    total,
  }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
