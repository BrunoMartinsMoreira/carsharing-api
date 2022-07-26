import { AppError } from '../../../../../shared/errors/AppError';
import { MockCategoriesRepository } from '../../repositories/mocks/MockCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let mockCategoriesRepository: MockCategoriesRepository;

describe('Create a category', () => {
  beforeEach(() => {
    mockCategoriesRepository = new MockCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(mockCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category name test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await mockCategoriesRepository.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
    expect(categoryCreated.name).toEqual(category.name);
  });

  it('should not be able to create a new category with an existing name', async () => {
    expect(async () => {
      const category = {
        name: 'Category name test',
        description: 'Category description test',
      };

      // cria pela primeira vez
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      // segunda tentativa com o mesmo nome da anterior
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
