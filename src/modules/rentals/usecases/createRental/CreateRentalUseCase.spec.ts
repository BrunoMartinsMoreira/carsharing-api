import { AppError } from '../../../../shared/errors/AppError';
import { MockCarsRepository } from '../../../cars/repositories/mocks/MockCarsRepository';
import { MockRentalsRepository } from '../../repositories/mocks/MockRentalsRepository';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: MockRentalsRepository;
let carsRepository: MockCarsRepository;

describe('Create a rental', () => {
  beforeEach(() => {
    rentalsRepository = new MockRentalsRepository();
    carsRepository = new MockCarsRepository();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
    );
  });

  it('shoul be able to create a new rental', async () => {
    const car = await carsRepository.create({
      name: 'car-test',
      description: 'description test',
      daily_rate: 50,
      fine_amount: 90,
      licence_plate: 'tst-9856',
      category_id: 'cat-123',
      brand: 'brand-test',
    });

    const testObj = {
      car_id: car.id,
      user_id: 'kj7456a',
      expected_return_date: '2022-08-20 07:50:00',
    };
    const rent = await createRentalUseCase.execute(testObj);

    expect(rent).toHaveProperty('id');
  });

  it('shoul not be able to create a new rental if car is not available', async () => {
    expect(async () => {
      const car = await carsRepository.create({
        name: 'car-test',
        description: 'description test',
        daily_rate: 50,
        fine_amount: 90,
        licence_plate: 'tst-9856',
        category_id: 'cat-123',
        brand: 'brand-test',
      });

      car.available = false;

      const testObj = {
        car_id: car.id,
        user_id: 'kj7456a',
        expected_return_date: '2022-08-20 07:50:00',
      };
      await createRentalUseCase.execute(testObj);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shoul not be able to create a new rental if user have an active rent', async () => {
    expect(async () => {
      const car = await carsRepository.create({
        name: 'car-test',
        description: 'description test',
        daily_rate: 50,
        fine_amount: 90,
        licence_plate: 'tst-9856',
        category_id: 'cat-123',
        brand: 'brand-test',
      });

      const testObj = {
        car_id: car.id,
        user_id: 'kj7456a',
        expected_return_date: '2022-08-20 07:50:00',
      };
      await createRentalUseCase.execute(testObj);

      const car2 = await carsRepository.create({
        name: 'car2-test',
        description: 'description2 test',
        daily_rate: 52,
        fine_amount: 92,
        licence_plate: 'ts2t-9856',
        category_id: 'ca2t-123',
        brand: 'brand-test2',
      });

      const testObj2 = {
        car_id: car2.id,
        user_id: 'kj7456a',
        expected_return_date: '2022-08-20 07:50:00',
      };
      await createRentalUseCase.execute(testObj2);
    }).rejects.toBeInstanceOf(AppError);
  });
});
