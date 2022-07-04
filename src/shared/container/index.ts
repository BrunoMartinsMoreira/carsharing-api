import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/categories/repositories/CategoriesRepository';
import { ICategoryRepository } from '../../modules/cars/categories/repositories/ICategoriesRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
