import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IFinishRental {
  id: string;
  total: number;
  active: boolean;
  end_date: Date;
}

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;

  findActiveByUserId(user_id: string): Promise<Rental>;

  findRentalById(id: string): Promise<Rental>;

  finishRental(data: IFinishRental): Promise<void>;
}

export { IRentalsRepository, IFinishRental };
