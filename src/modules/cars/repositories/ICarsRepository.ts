import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository };
