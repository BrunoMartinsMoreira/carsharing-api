import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUsersDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUserRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create({
    name,
    password,
    email,
    driver_licence,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_licence,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
