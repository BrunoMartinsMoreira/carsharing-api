import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUserRepository';

class MockUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_licence,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { driver_licence, email, name, password });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async uploadAvatar?(data: ICreateUserDTO): Promise<void> {
    console.log(data);
  }

  async updatePassword(password: string, id: string): Promise<void> {
    const user = this.users.find(user => user.id === id);
    user.password = password;
    this.users.push(user);
  }
}

export { MockUsersRepository };
