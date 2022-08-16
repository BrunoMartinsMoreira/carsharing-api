import { getRepository, Repository } from 'typeorm';
import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      licence_plate,
    });

    return car;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository };