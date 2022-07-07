import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUserRepository';
import { ICategoryRepository } from '../../modules/cars/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/categories/repositories/implementations/CategoriesRepository';
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
