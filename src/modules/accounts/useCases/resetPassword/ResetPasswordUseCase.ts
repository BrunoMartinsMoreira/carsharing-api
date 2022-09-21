import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/datePovider/IDateProvider';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DayjsProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    const { expires_date, user_id } = userToken;
    const now = this.dateProvider.dateNow();

    if (this.dateProvider.compareIfBEfore(expires_date, now)) {
      throw new AppError('Token expired');
    }

    const pwdHash = await hash(password, 8);

    await this.usersRepository.updatePassword(pwdHash, user_id);
    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
