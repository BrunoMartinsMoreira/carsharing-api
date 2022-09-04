import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/datePovider/IDateProvider';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const {
      JWT_SECRET_KEY,
      TOKEN_EXPIRATION,
      REFRESH_TOKEN_SECRET_KEY,
      REFRESH_TOKEN_EXPIRATION,
    } = process.env;

    if (!user) {
      throw new AppError('Incorret email or password', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorret email or password', 401);
    }

    const token = sign({}, String(JWT_SECRET_KEY), {
      subject: user.id,
      expiresIn: String(TOKEN_EXPIRATION),
    });

    const refresh_token = sign({ email }, String(REFRESH_TOKEN_SECRET_KEY), {
      subject: user.id,
      expiresIn: String(REFRESH_TOKEN_EXPIRATION),
    });

    const expires_date = this.dateProvider.addDays(30);

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date,
      refresh_token,
    });

    const tokenResponse: IResponse = {
      user: {
        id: user.id,
        name: user.name,
        email,
        isAdmin: user.isAdmin,
      },
      token,
      refresh_token,
    };
    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
