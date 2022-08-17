import { getRepository, Repository } from 'typeorm';
import { ICreateCarImageDTO } from '../../../dtos/ICreateCarImageDTO';
import { ICarsImageRepository } from '../../../repositories/ICarsImageRepository';
import { CarImage } from '../entities/CarImage';

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImageRepository };
