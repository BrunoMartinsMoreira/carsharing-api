import { ICreateCarImageDTO } from '../../dtos/ICreateCarImageDTO';
import { CarImage } from '../../infra/typeorm/entities/CarImage';
import { ICarsImageRepository } from '../ICarsImageRepository';

class MockCarsImageRepository implements ICarsImageRepository {
  carsImage: CarImage[] = [];

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, { car_id, image_name });

    this.carsImage.push(carImage);

    return carImage;
  }
}

export { MockCarsImageRepository };
