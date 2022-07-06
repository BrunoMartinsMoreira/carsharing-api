import { container } from 'tsyringe';
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
