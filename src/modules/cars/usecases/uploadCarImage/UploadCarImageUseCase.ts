import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/IStorageProvider';
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

    @inject('AwsS3StorageProvider')
    private readonly StorageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.map(async image => {
      await this.carsImageRepository.create({
        car_id,
        image_name: image,
      });
      await this.StorageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImageUseCase };
