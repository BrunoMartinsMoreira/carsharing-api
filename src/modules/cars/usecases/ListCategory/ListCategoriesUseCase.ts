import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}
  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    if (!categories.length) {
      throw new AppError('Not categories found!');
    }

    return categories;
  }
}

export { ListCategoriesUseCase };
