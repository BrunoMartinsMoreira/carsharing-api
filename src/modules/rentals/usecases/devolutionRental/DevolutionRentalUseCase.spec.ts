import 'reflect-metadata';
import dayjs from 'dayjs';
import { AppError } from '../../../../shared/errors/AppError';
import { DayJsProvider } from '../../../../shared/providers/datePovider/implementations/DayjsProvider';
import { MockCarsRepository } from '../../../cars/repositories/mocks/MockCarsRepository';
import { MockRentalsRepository } from '../../repositories/mocks/MockRentalsRepository';
import { CreateRentalUseCase } from '../createRental/CreateRentalUseCase';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

let mockCarsRepository: MockCarsRepository;
let mockRentalsRepository: MockRentalsRepository;
let devolutionRentalUseCase: DevolutionRentalUseCase;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayJsProvider;

const returnDate = dayjs().add(1, 'day').toDate();

describe('Finish a rental', () => {
  beforeEach(() => {
    mockRentalsRepository = new MockRentalsRepository();
    mockCarsRepository = new MockCarsRepository();
    dateProvider = new DayJsProvider();

    createRentalUseCase = new CreateRentalUseCase(
      mockRentalsRepository,
      mockCarsRepository,
      dateProvider,
    );

    devolutionRentalUseCase = new DevolutionRentalUseCase(
      mockRentalsRepository,
      mockCarsRepository,
      dateProvider,
    );
  });

  it('Should be able to finish a rental', async () => {
    const car = await mockCarsRepository.create({
      name: 'Car test1',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'id2',
      expected_return_date: returnDate,
    });

    let dataObj = {
      id: rental.id,
      userId: 'id2',
    };

    await devolutionRentalUseCase.execute(dataObj);

    const rentalfinished = await mockRentalsRepository.findRentalById(
      rental.id,
    );

    expect(rentalfinished.active).toBe(false);
    expect(car.available).toBe(true);
  });

  it('Shold throw if rental id is null', async () => {
    const car = await mockCarsRepository.create({
      name: 'Car test1',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    await mockRentalsRepository.create({
      car_id: car.id,
      user_id: 'id2',
      expected_return_date: returnDate,
    });

    let dataObj = {
      id: '',
      userId: 'id2',
    };

    await expect(devolutionRentalUseCase.execute(dataObj)).rejects.toEqual(
      new AppError('Rental id is required'),
    );
  });

  it('Shold throw if rental id is incorrect', async () => {
    const car = await mockCarsRepository.create({
      name: 'Car test1',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    await mockRentalsRepository.create({
      car_id: car.id,
      user_id: 'id2',
      expected_return_date: returnDate,
    });

    let dataObj = {
      id: 'incorrect rental id',
      userId: 'id2',
    };

    await expect(devolutionRentalUseCase.execute(dataObj)).rejects.toEqual(
      new AppError('Rental does not exists'),
    );
  });

  it('Shold throw user id is incorrect', async () => {
    const car = await mockCarsRepository.create({
      name: 'Car test1',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    const rental = await mockRentalsRepository.create({
      car_id: car.id,
      user_id: 'id2',
      expected_return_date: returnDate,
    });

    let dataObj = {
      id: rental.id,
      userId: 'incorrect user id',
    };

    await expect(devolutionRentalUseCase.execute(dataObj)).rejects.toEqual(
      new AppError('Only user responsible for the rental can close it'),
    );
  });
});
