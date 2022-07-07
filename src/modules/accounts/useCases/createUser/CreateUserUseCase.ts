import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/ICreateUsersDTO';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    username,
    password,
    email,
    driver_licence,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      password,
      email,
      driver_licence,
    });
  }
}

export { CreateUserUseCase };
