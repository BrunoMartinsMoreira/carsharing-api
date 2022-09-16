import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/datePovider/IDateProvider';
import { IEmailProvider } from '../../../../shared/providers/emailProvider/IEmailProvider';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokensRepository,

    @inject('DayjsProvider')
    private dateProvider: IDateProvider,

    @inject('EtherealEmailProvider')
    private emailProvider: IEmailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    const { FORGOT_MAIL_URL } = process.env;

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgot-password.hbs',
    );

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const token = uuidv4();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${FORGOT_MAIL_URL}/password/reset?token=${token}`,
    };

    await this.emailProvider.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      variables,
      path: templatePath,
    });
  }
}

export { SendForgotPasswordMailUseCase };
