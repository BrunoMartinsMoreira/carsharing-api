import { Category } from '../model/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  public async list(): Promise<Category[]> {
    return this.categories;
  }

  public async findByName(name: string): Promise<Category> {
    const category = this.categories.find(cat => cat.name === name);
    return category;
  }
}

export { CategoriesRepository };
