import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IStorageProvider } from '../../../../shared/providers/StorageProvider/IStorageProvider';
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

    @inject('AwsS3StorageProvider')
    private readonly StorageProvider: IStorageProvider,
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!avatar_file) {
      throw new AppError('File is required');
    }

    if (user.avatar_url) {
      await this.StorageProvider.delete(user.avatar_url, 'avatars');
    }

    await this.StorageProvider.save(avatar_file, 'avatars');

    user.avatar_url = avatar_file;
    await this.usersRepository.uploadAvatar(user);
  }
}

export { UpdateUserAvatarUseCase };
