import dayjs from 'dayjs';
import { MockCarsRepository } from '../../../cars/repositories/mocks/MockCarsRepository';
import { MockRentalsRepository } from '../../repositories/mocks/MockRentalsRepository';
import { ListUserRentalsUseCase } from './ListUserRentalsUseCase';

let mockCarsRepository: MockCarsRepository;
let mockRentalsRepository: MockRentalsRepository;
let listUserRentalsUseCase: ListUserRentalsUseCase;

describe('List all rentals by user id', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository();
    mockRentalsRepository = new MockRentalsRepository();
    listUserRentalsUseCase = new ListUserRentalsUseCase(mockRentalsRepository);
  });

  it('Should be able to list all rentals by user id', async () => {
    const returnDate = dayjs().add(1, 'day').toDate();

    const car = await mockCarsRepository.create({
      name: 'Car test1',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    const car2 = await mockCarsRepository.create({
      name: 'Car test2',
      description: 'Car description test2',
      daily_rate: 80,
      licence_plate: 'OWX-8796',
      fine_amount: 45,
      brand: 'Brand test',
      category_id: 'id-test2',
    });

    const car3 = await mockCarsRepository.create({
      name: 'Car test3',
      description: 'Car description test3',
      daily_rate: 80,
      licence_plate: 'OWX-7869',
      fine_amount: 45,
      brand: 'Brand test',
      category_id: 'id-test',
    });

    const rental1 = {
      car_id: car.id,
      user_id: 'id1',
      expected_return_date: returnDate,
    };

    const rental2 = {
      car_id: car2.id,
      user_id: 'id1',
      expected_return_date: returnDate,
    };

    const rental3 = {
      car_id: car3.id,
      user_id: 'id2',
      expected_return_date: returnDate,
    };

    await mockRentalsRepository.create(rental1);
    await mockRentalsRepository.create(rental2);
    await mockRentalsRepository.create(rental3);

    const response = await listUserRentalsUseCase.execute('id1');

    expect(response.length).toEqual(2);
  });
});
