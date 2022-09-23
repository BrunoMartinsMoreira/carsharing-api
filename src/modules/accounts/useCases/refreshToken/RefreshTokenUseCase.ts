import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/datePovider/IDateProvider';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  refresh_token: string;
  token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(_refreshToken: string): Promise<IResponse> {
    const {
      REFRESH_TOKEN_SECRET_KEY,
      REFRESH_TOKEN_EXPIRATION,
      JWT_SECRET_KEY,
      TOKEN_EXPIRATION,
    } = process.env;

    const { sub, email } = verify(
      _refreshToken,
      String(REFRESH_TOKEN_SECRET_KEY),
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        _refreshToken,
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign(
      { email },
      String(REFRESH_TOKEN_SECRET_KEY),
      {
        subject: sub,
        expiresIn: String(REFRESH_TOKEN_EXPIRATION),
      },
    );

    const expires_date = this.dateProvider.addDays(30);

    const token = sign({}, JWT_SECRET_KEY, {
      subject: user_id,
      expiresIn: TOKEN_EXPIRATION,
    });

    await this.usersTokensRepository.create({
      user_id: sub,
      expires_date,
      refresh_token: new_refresh_token,
    });

    return {
      refresh_token: new_refresh_token,
      token,
    };
  }
}

export { RefreshTokenUseCase };
