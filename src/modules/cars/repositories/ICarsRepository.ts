import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car>;

  findByLicencePlate(licence_plate: string): Promise<Car | undefined>;
}

export { ICarsRepository };
