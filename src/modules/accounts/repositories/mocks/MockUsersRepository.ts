import { ICreateUserDTO } from '../../dtos/ICreateUsersDTO';
import { User } from '../../entities/User';
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
}

export { MockUsersRepository };