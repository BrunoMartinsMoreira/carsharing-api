import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!avatar_file) {
      throw new AppError('File is required');
    }

    if (user) {
      await deleteFile(`./tmp/avatar/${user.avatar_url}`);
      user.avatar_url = avatar_file;
      await this.usersRepository.uploadAvatar(user);
    }
  }
}

export { UpdateUserAvatarUseCase };
