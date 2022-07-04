import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/categories/repositories/CategoriesRepository';
import { ICategoryRepository } from '../../modules/cars/categories/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '../../modules/cars/specifications/repositories/ISpecificationsRepository';
import { SpecificationRepository } from '../../modules/cars/specifications/repositories/SpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
);
