import { AppError } from '../../../../shared/errors/AppError';
import { MockCarsRepository } from '../../repositories/mocks/MockCarsRepository';
import { MockSpecificationsRepository } from '../../repositories/mocks/MockSpecificationsRepository';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: MockCarsRepository;
let specificationsRepository: MockSpecificationsRepository;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepository = new MockCarsRepository();
    specificationsRepository = new MockSpecificationsRepository();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository,
    );
  });

  it('should not be able to add a new specification to an inexistent car', () => {
    expect(async () => {
      const car_id = '123test';
      const specifications_id = ['12', '21', '37'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      licence_plate: 'OWX-7893',
      fine_amount: 65,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    const spec1 = await specificationsRepository.create({
      name: 'test1',
      description: 'description test 1',
    });

    const spec2 = await specificationsRepository.create({
      name: 'test2',
      description: 'description test 2',
    });

    const specifications_id = [spec1.id, spec2.id];

    const carSpec = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(carSpec).toHaveProperty('specifications');
    expect(carSpec.specifications.length).toBe(2);
  });
});
