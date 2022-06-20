import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ImportCategoryUseCase } from './ImportCategoriesUseCase';
import { ImportCategoryController } from './ImportCategoryController';

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);

export { importCategoryController };
