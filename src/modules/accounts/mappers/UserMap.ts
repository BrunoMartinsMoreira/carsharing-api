import { IUserResponseDto } from '../dtos/IUserResponseDto';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toDto({
    id,
    email,
    name,
    avatar_url,
    driver_licence,
  }: User): IUserResponseDto {
    return {
      id,
      email,
      name,
      avatar_url,
      driver_licence,
    };
  }
}
