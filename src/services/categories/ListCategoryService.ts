// import { Category } from '../model/Category';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

class ListCategoryService {
  constructor(private categoriesRepository: ICategoryRepository) {}
  public async execute() {
    const categories = await this.categoriesRepository.list();

    if (!categories.length) {
      throw new Error('Not categories found!');
    }

    return categories;
  }
}

export { ListCategoryService };
