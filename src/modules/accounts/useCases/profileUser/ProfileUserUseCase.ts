import { inject, injectable } from 'tsyringe';
import { IUserResponseDto } from '../../dtos/IUserResponseDto';
import { UserMap } from '../../mappers/UserMap';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDto> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDto(user);
  }
}
