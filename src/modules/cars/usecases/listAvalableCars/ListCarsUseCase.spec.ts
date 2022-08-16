import { MockCarsRepository } from '../../repositories/mocks/MockCarsRepository';
import { ListAvailableCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let mockCarsRepository: MockCarsRepository;

describe('List cars', () => {
  beforeEach(() => {
    mockCarsRepository = new MockCarsRepository();
    listCarsUseCase = new ListAvailableCarsUseCase(mockCarsRepository);
  });

  it('should be able to list all availible cars', async () => {
    const car1 = await mockCarsRepository.create({
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
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test1',
      category_id: 'id-test2',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it('should be able to list all availible cars by name', async () => {
    const carAvailable1 = await mockCarsRepository.create({
      name: 'Car test1',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test1',
      category_id: 'id-test',
    });

    const carAvailable2 = await mockCarsRepository.create({
      name: 'Car test2',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test1',
      category_id: 'id-test2',
    });

    const carAvailable3 = await mockCarsRepository.create({
      name: 'Car test3',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test6',
      category_id: 'id-test3',
    });

    const carAvailable4 = await mockCarsRepository.create({
      name: 'Car test3',
      description: 'Car description test',
      daily_rate: 80,
      licence_plate: 'OWX-7896',
      fine_amount: 45,
      brand: 'Brand test4',
      category_id: 'id-test3',
    });

    const testFilterByCategoryId = await listCarsUseCase.execute({
      category_id: 'id-test3',
      brand: '',
      name: '',
    });

    const testFilterByBrand = await listCarsUseCase.execute({
      category_id: '',
      brand: 'Brand test1',
      name: '',
    });

    const filterByName = await listCarsUseCase.execute({
      category_id: '',
      brand: '',
      name: 'Car test1',
    });

    expect(testFilterByCategoryId).toEqual([carAvailable3, carAvailable4]);
    expect(testFilterByBrand).toEqual([carAvailable1, carAvailable2]);
    expect(filterByName).toEqual([carAvailable1]);
  });
});
