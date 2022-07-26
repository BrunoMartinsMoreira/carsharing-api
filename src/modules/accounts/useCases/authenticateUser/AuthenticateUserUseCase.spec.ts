import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUsersDTO';
import { MockUsersRepository } from '../../repositories/mocks/MockUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let mockUsersRepository: MockUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate Users', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    createUserUseCase = new CreateUserUseCase(mockUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(mockUsersRepository);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_licence: '456001',
      email: 'user@test.com',
      password: 'test',
      name: 'user auth test',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'unexistent@user.com',
        password: 'falsepwd',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate an user with incorrect password', () => {
    expect(async () => {
      const user2: ICreateUserDTO = {
        driver_licence: '456897',
        email: 'user@testincorrectpassword.com',
        password: '12345',
        name: 'user2 test',
      };

      await createUserUseCase.execute(user2);

      await authenticateUserUseCase.execute({
        email: user2.email,
        password: 'incorrectpassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
