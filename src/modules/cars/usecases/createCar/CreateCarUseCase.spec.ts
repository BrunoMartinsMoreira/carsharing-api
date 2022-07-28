import { AppError } from '../../../../shared/errors/AppError';
import { MockCarsRepository } from '../../repositories/mocks/MockCarsRepository';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: MockCarsRepository;

beforeEach(() => {
  carsRepository = new MockCarsRepository();
  createCarUseCase = new CreateCarUseCase(carsRepository);
});

describe('Create car', () => {
  it('Shoul be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      licence_plate: 'OWX-7893',
      fine_amount: 65,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create an car with a existing licence plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car test',
        description: 'Car description test',
        daily_rate: 80,
        licence_plate: 'OWX-7896',
        fine_amount: 45,
        brand: 'Brand test',
        category_id: 'id-test',
      });

      await createCarUseCase.execute({
        name: 'Car test2',
        description: 'Car description test2',
        daily_rate: 180,
        licence_plate: 'OWX-7896',
        fine_amount: 95,
        brand: 'Brand test2',
        category_id: 'id-test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Shoul be able to create a new car with availability true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Availability test',
      description: 'Car Availability description test',
      daily_rate: 100,
      licence_plate: 'OWX-6893',
      fine_amount: 65,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    expect(car.available).toBe(true);
  });
});
