import { ICreateUserDTO } from '../dtos/ICreateUsersDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  uploadAvatar?(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
