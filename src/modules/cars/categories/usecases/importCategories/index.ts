import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ImportCategoryUseCase } from './ImportCategoriesUseCase';
import { ImportCategoryController } from './ImportCategoryController';

export default () => {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase,
  );

  return importCategoryController;
};
