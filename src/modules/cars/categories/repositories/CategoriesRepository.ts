/* eslint-disable no-use-before-define */
import { Category } from '../model/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  public create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category {
    const category = this.categories.find(cat => cat.name === name);
    return category;
  }
}

export { CategoriesRepository };
