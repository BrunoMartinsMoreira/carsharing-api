import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    password: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorret email or password');
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorret email or password');
    }

    const token = sign({}, '26ddae7bb48aa3ae72ce7e08ccbafc19', {
      subject: user.id,
      expiresIn: '7d',
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
