import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUserRepository';
import { IUsersTokensRepository } from '../../modules/accounts/repositories/IUsersTokensRepository';
import { CarsImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImageRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarsImageRepository } from '../../modules/cars/repositories/ICarsImageRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { ICategoryRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImageRepository>(
  'CarsImageRepository',
  CarsImageRepository,
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
