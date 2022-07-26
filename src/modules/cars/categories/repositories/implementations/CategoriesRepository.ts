/* eslint-disable no-use-before-define */
import { getRepository, Repository } from 'typeorm';
import { Category } from '../../infra/typeorm/entities/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
  private respository: Repository<Category>;

  constructor() {
    this.respository = getRepository(Category);
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = this.respository.create({ name, description });

    await this.respository.save(category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.respository.find();
    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.respository.findOne({
      where: {
        name,
      },
    });
    return category;
  }
}

export { CategoriesRepository };
