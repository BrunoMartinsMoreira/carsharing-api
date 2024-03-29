import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUserRepository';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async uploadAvatar({
    name,
    password,
    email,
    driver_licence,
    id,
    avatar_url,
  }: ICreateUserDTO): Promise<void> {
    await this.repository.save({
      name,
      password,
      email,
      driver_licence,
      id,
      avatar_url,
    });
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
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
    id,
    avatar_url,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_licence,
      id,
      avatar_url,
    });

    await this.repository.save(user);
  }

  async updatePassword(password: string, id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ password })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { UsersRepository };
