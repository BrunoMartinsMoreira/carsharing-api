import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class MockCarsRepository implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    await this.cars.push(car);

    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.licence_plate === licence_plate);
    return car;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    let availables = await this.cars.filter(car => car.available === true);

    if (category_id || brand || name) {
      availables = availables.filter(
        car =>
          car.category_id === category_id ||
          car.brand === brand ||
          car.name === name,
      );
    }

    return availables;
  }

  async findByCarId(id: string): Promise<Car> {
    const car = await this.cars.find(car => car.id === id);
    return car;
  }
}

export { MockCarsRepository };
