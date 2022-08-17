import { inject, injectable } from 'tsyringe';
import { CarsImageRepository } from '../../infra/typeorm/repositories/CarsImageRepository';

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: CarsImageRepository,
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.map(async image_name => {
      const carImage = await this.carsImageRepository.create({
        car_id,
        image_name,
      });
      return carImage;
    });
  }
}

export { UploadCarImageUseCase };
