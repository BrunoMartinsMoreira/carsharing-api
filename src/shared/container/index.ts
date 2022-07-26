import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUserRepository';
import { CategoriesRepository } from '../../modules/cars/categories/infra/typeorm/repositories/CategoriesRepository';
import { ICategoryRepository } from '../../modules/cars/categories/repositories/ICategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/specifications/repositories/implementations/SpecificationRepository';
import { ISpecificationRepository } from '../../modules/cars/specifications/repositories/ISpecificationsRepository';

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
