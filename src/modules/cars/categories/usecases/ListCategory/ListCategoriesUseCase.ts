import { Category } from '../../entities/Category';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}
  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    if (!categories.length) {
      throw new Error('Not categories found!');
    }

    return categories;
  }
}

export { ListCategoriesUseCase };
